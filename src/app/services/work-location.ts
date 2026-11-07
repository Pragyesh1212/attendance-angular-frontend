
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, defer, of, switchMap, timer } from 'rxjs';
import { environment } from '../../environments/environment';

export type WorkLocationType = 'OFFICE' | 'REMOTE' | 'MEETING' | 'FIELD';

export interface WorkLocation {
  id: string;
  name: string;
  type: WorkLocationType;
  address: string | null;
  latitude: number;
  longitude: number;
  radiusMeters: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
}

export interface NominatimPlace {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export interface CreateWorkLocationPayload {
  name: string;
  type: WorkLocationType;
  address?: string;
  latitude: number;
  longitude: number;
  radiusMeters?: number;
}

export type UpdateWorkLocationPayload = Partial<CreateWorkLocationPayload>;

@Injectable({ providedIn: 'root' })
export class WorkLocationService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/work-locations`;
  private readonly nominatimUrl = 'https://nominatim.openstreetmap.org';

  private lastRequestAt = 0;
  private cache = new Map<string, any>();

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  create(payload: CreateWorkLocationPayload): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }

  update(id: string, payload: UpdateWorkLocationPayload): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, payload);
  }

  deactivate(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  assignPermanent(employeeProfileId: string, workLocationId: string) {
    return this.http.patch(
      `${this.apiUrl}/employees/${employeeProfileId}/permanent`,
      { workLocationId }
    );
  }

  assignTemporary(employeeProfileId: string, payload: {
    workLocationId: string;
    startAt: string;
    endAt: string;
    reason?: string;
  }) {
    return this.http.post(
      `${this.apiUrl}/employees/${employeeProfileId}/temporary`,
      payload
    );
  }

  searchPlace(query: string): Observable<NominatimPlace[]> {
    const key = `search:${query.trim().toLowerCase()}`;

    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }

    const params = new HttpParams()
      .set('format', 'jsonv2')
      .set('addressdetails', '1')
      .set('limit', '6')
      .set('q', query.trim());

    return this.nominatimRequest<NominatimPlace[]>(
      key,
      () => this.http.get<NominatimPlace[]>(
        `${this.nominatimUrl}/search`,
        { params }
      )
    );
  }

  reverseGeocode(latitude: number, longitude: number): Observable<any> {
    const key = `reverse:${latitude.toFixed(5)},${longitude.toFixed(5)}`;

    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }

    const params = new HttpParams()
      .set('format', 'jsonv2')
      .set('addressdetails', '1')
      .set('zoom', '18')
      .set('lat', String(latitude))
      .set('lon', String(longitude));

    return this.nominatimRequest<any>(
      key,
      () => this.http.get(
        `${this.nominatimUrl}/reverse`,
        { params }
      )
    );
  }

  private nominatimRequest<T>(
    key: string,
    request: () => Observable<T>
  ): Observable<T> {
    return defer(() => {
      const wait = Math.max(
        0,
        1000 - (Date.now() - this.lastRequestAt)
      );

      return timer(wait).pipe(
        switchMap(() => {
          this.lastRequestAt = Date.now();
          return request();
        })
      );
    }).pipe(
      switchMap(result => {
        this.cache.set(key, result);
        return of(result);
      })
    );
  }
}
