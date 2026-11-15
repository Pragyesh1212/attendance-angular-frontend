import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export type DeviceStatus = 'PENDING' | 'APPROVED' | 'REVOKED';
export interface RegisteredDevice {
  id: string;
  label: string;
  deviceType: string | null;
  operatingSystem: string | null;
  browser: string | null;
  status: DeviceStatus;
  createdAt: string;
  approvedAt: string | null;
  revokedAt: string | null;
  lastSeenAt: string | null;
  lastIp?: string | null;
}
export interface DeviceList { maxDevices: number; devices: RegisteredDevice[]; }

interface StoredBrowserKey {
  userId: string;
  privateKey: CryptoKey;
  publicKeySpki: string;
  deviceId?: string;
}

// Private ECDSA key is non-exportable and kept in IndexedDB, not localStorage.
// Browser profiles can be reset/copied: it is NOT a hardware-backed identity.
@Injectable({ providedIn: 'root' })
export class EmployeeDeviceService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/devices`;
  private registering: Promise<RegisteredDevice> | null = null;

  private async database(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('attendease-employee-device-v1', 1);
      request.onupgradeneeded = () => { request.result.createObjectStore('keys'); };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Browser device storage unavailable'));
    });
  }

  private async loadKey(userId: string): Promise<StoredBrowserKey | undefined> {
    const db = await this.database();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction('keys', 'readonly');
        const req = tx.objectStore('keys').get(userId);
        req.onsuccess = () => resolve(req.result as StoredBrowserKey | undefined);
        req.onerror = () => reject(req.error);
      });
    } finally { db.close(); }
  }

  private async storeKey(key: StoredBrowserKey): Promise<void> {
    const db = await this.database();
    try {
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction('keys', 'readwrite');
        tx.objectStore('keys').put(key, key.userId);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } finally { db.close(); }
  }

  private b64url(bytes: ArrayBuffer): string {
    const uint = new Uint8Array(bytes);
    let binary = '';
    for (let i = 0; i < uint.length; i++) binary += String.fromCharCode(uint[i]);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  private async createKey(userId: string): Promise<StoredBrowserKey> {
    const pair = await crypto.subtle.generateKey(
      { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign', 'verify'],
    ) as CryptoKeyPair;
    const spki = await crypto.subtle.exportKey('spki', pair.publicKey);
    const key: StoredBrowserKey = {
      userId, privateKey: pair.privateKey, publicKeySpki: this.b64url(spki),
    };
    await this.storeKey(key);
    return key;
  }

  private async sign(key: StoredBrowserKey, message: string): Promise<string> {
    const signature = await crypto.subtle.sign(
      { name: 'ECDSA', hash: 'SHA-256' }, key.privateKey,
      new TextEncoder().encode(message),
    );
    return this.b64url(signature);
  }

  private details() {
    const userAgent = navigator.userAgent.slice(0, 500);
    const operatingSystem = /Android/i.test(userAgent) ? 'Android'
      : /iPhone|iPad/i.test(userAgent) ? 'iOS/iPadOS'
      : /Windows/i.test(userAgent) ? 'Windows'
      : /Mac OS X/i.test(userAgent) ? 'macOS'
      : /Linux/i.test(userAgent) ? 'Linux' : 'Unknown';
    const browser = /Edg\//.test(userAgent) ? 'Edge'
      : /Chrome\//.test(userAgent) ? 'Chrome'
      : /Firefox\//.test(userAgent) ? 'Firefox'
      : /Safari\//.test(userAgent) ? 'Safari' : 'Browser';
    const version = userAgent.match(/(?:Edg|Chrome|Firefox|Version)\/([0-9.]+)/)?.[1];
    const browserVersion = version ? `${browser} ${version}` : browser;
    const deviceType = /Android|iPhone|Mobile/i.test(userAgent) ? 'Mobile'
      : /iPad|Tablet/i.test(userAgent) ? 'Tablet' : 'Desktop';
    return {
      label: `${operatingSystem} ${browser}`,
      operatingSystem, browser: browserVersion, deviceType, userAgent,
    };
  }

  myDevices(): Promise<DeviceList> {
    return firstValueFrom(this.http.get<DeviceList>(`${this.base}/me`));
  }

  // Called after employee login. Metadata is collected automatically; the key is
  // created locally, and Admin sees a PENDING request. No manual device ID entry.
  ensureRegistered(userId: string): Promise<RegisteredDevice> {
    if (this.registering) return this.registering;
    this.registering = this.doRegister(userId).finally(() => { this.registering = null; });
    return this.registering;
  }

  private async doRegister(userId: string): Promise<RegisteredDevice> {
    if (!window.isSecureContext || !crypto?.subtle || !('indexedDB' in window)) {
      throw new Error('Device registration requires HTTPS (or localhost) and browser storage.');
    }
    const devices = await this.myDevices();
    let key = await this.loadKey(userId);
    if (key?.deviceId) {
      const existing = devices.devices.find(d => d.id === key!.deviceId);
      if (existing) return existing;
    }
    // Prevent generating a key when all two slots are already occupied.
    if (devices.devices.filter(d => d.status !== 'REVOKED').length >= devices.maxDevices) {
      throw new Error('Two devices are registered or pending. Ask Admin to revoke a device first.');
    }
    key ??= await this.createKey(userId);
    const challenge = await firstValueFrom(this.http.post<{ challengeId: string; challenge: string }>(
      `${this.base}/register/challenge`, {},
    ));
    const signature = await this.sign(key,
      `attendease:register:v1:${challenge.challengeId}:${challenge.challenge}`,
    );
    const device = await firstValueFrom(this.http.post<RegisteredDevice>(`${this.base}/register`, {
      challengeId: challenge.challengeId, publicKeySpki: key.publicKeySpki,
      signature, ...this.details(),
    }));
    key.deviceId = device.id;
    await this.storeKey(key);
    return device;
  }

  async currentBrowserDevice(userId: string): Promise<RegisteredDevice | null> {
    const key = await this.loadKey(userId);
    if (!key?.deviceId) return null;
    const devices = await this.myDevices();
    return devices.devices.find(d => d.id === key.deviceId) ?? null;
  }

  async punchProof(userId: string): Promise<string> {
    const key = await this.loadKey(userId);
    if (!key?.deviceId) throw new Error('This browser has not been registered. Sign in again or contact Admin.');
    const current = await this.currentBrowserDevice(userId);
    if (current?.status !== 'APPROVED') {
      throw new Error(current?.status === 'PENDING'
        ? 'Device registration is awaiting Admin approval.'
        : 'This browser is not approved. Contact your Admin.');
    }
    const challenge = await firstValueFrom(this.http.post<{ challengeId: string; challenge: string }>(
      `${this.base}/${key.deviceId}/auth/challenge`, {},
    ));
    const signature = await this.sign(key,
      `attendease:authenticate:v1:${challenge.challengeId}:${challenge.challenge}`,
    );
    const result = await firstValueFrom(this.http.post<{ proof: string }>(`${this.base}/auth/verify`, {
      deviceId: key.deviceId, challengeId: challenge.challengeId, signature,
    }));
    return result.proof;
  }

  adminDevices(employeeUserId: string): Promise<DeviceList> {
    return firstValueFrom(this.http.get<DeviceList>(`${this.base}/admin/employee/${employeeUserId}`));
  }
  adminAction(deviceId: string, action: 'approve' | 'revoke' | 'reactivate' | 'rename', label?: string): Promise<RegisteredDevice> {
    return firstValueFrom(this.http.patch<RegisteredDevice>(`${this.base}/admin/${deviceId}/${action}`,
      action === 'rename' ? { label } : {}));
  }
}
