import { TranslateTextPipe } from '../../shared/translate-text.pipe';
import { FeedbackService } from '../../shared/feedback/feedback.service';

import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectorRef,
  inject,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs';

import {
  WorkLocationService,
  WorkLocation,
  WorkLocationType,
  NominatimPlace
} from '../../services/work-location';

@Component({
  selector: 'app-work-locations',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateTextPipe],
  templateUrl: './work-locations.html'
})
export class WorkLocationsComponent implements OnInit {
  private readonly uiFeedback = inject(FeedbackService);

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get errorMessage(): string { return ''; }
  set errorMessage(value: string) {
    if (value) this.uiFeedback.error(value);
  }

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get successMessage(): string { return ''; }
  set successMessage(value: string) {
    if (value) this.uiFeedback.success(value);
  }

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get assignmentError(): string { return ''; }
  set assignmentError(value: string) {
    if (value) this.uiFeedback.error(value);
  }

  // Centralized notification: the old inline banner reads an empty value.
  // The original assignments still work and now open AttendEase feedback.
  get assignmentSuccess(): string { return ''; }
  set assignmentSuccess(value: string) {
    if (value) this.uiFeedback.success(value);
  }


  private service = inject(WorkLocationService);
  private cdr = inject(ChangeDetectorRef);

  locations: WorkLocation[] = [];
  filteredLocations: WorkLocation[] = [];

  // Display-only addresses resolved from GPS coordinates when no address is stored.
  locationAddresses: Record<string, string> = {};

  statusDialogLocation: WorkLocation | null = null;
  statusSaving = false;
  statusError = '';
  activationIp = '';

  loading = false;
  saving = false;
  
  

  searchTerm = '';
  typeFilter = 'ALL';

  showCreateModal = false;
  modalMode: 'create' | 'edit' = 'create';
  editingLocationId: string | null = null;

  locationMethod: 'current' | 'search' = 'current';

  detectingLocation = false;
  searchingLocation = false;

  placeSearchQuery = '';
  placeResults: NominatimPlace[] = [];
  locationSearchError = '';

  locationTypes: { value: WorkLocationType; label: string }[] = [
    { value: 'OFFICE', label: 'Office' },
    { value: 'REMOTE', label: 'Remote' },
    { value: 'MEETING', label: 'Meeting' },
    { value: 'FIELD', label: 'Field' }
  ];

  selectedPlaceLabel = '';

  form = {
    name: '',
    type: 'OFFICE' as WorkLocationType,
    address: '',
    latitude: null as number | null,
    longitude: null as number | null,
    radiusMeters: 100,
    wifiIpsText: ''
  };

  assignmentMode: 'permanent' | 'temporary' = 'permanent';

  assignmentForm = {
    employeeProfileId: '',
    workLocationId: '',
    startAt: '',
    endAt: '',
    reason: ''
  };

  assigning = false;
  
  

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.loading = true;
    this.errorMessage = '';

    this.service.getAll().subscribe({
      next: (response) => {
        this.locations = response.locations || [];
        this.locationAddresses = {};

        // Prefer the address already saved in the database.
        // Only locations without an address need reverse geocoding.
        this.locations.forEach(location => {
          this.locationAddresses[location.id] =
            location.address?.trim() || 'Resolving address...';
        });

        this.applyFilters();
        this.loading = false;
        this.cdr.detectChanges();

        this.resolveMissingAddresses();
      },
      error: (error) => {
        this.errorMessage = this.getError(error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  getLocationAddress(location: WorkLocation): string {
    return this.locationAddresses[location.id] ||
      location.address?.trim() ||
      'Address unavailable';
  }

  /**
   * Resolve missing display addresses one at a time. The existing
   * WorkLocationService already caches and throttles Nominatim requests.
   * Coordinates remain unchanged and continue to be used for geofencing.
   */
  private resolveMissingAddresses(index = 0): void {
    if (index >= this.locations.length) {
      return;
    }

    const location = this.locations[index];

    if (location.address?.trim()) {
      this.resolveMissingAddresses(index + 1);
      return;
    }

    this.service.reverseGeocode(
      Number(location.latitude),
      Number(location.longitude)
    ).subscribe({
      next: result => {
        this.locationAddresses[location.id] =
          result?.display_name?.trim() || 'Address unavailable';
        this.cdr.detectChanges();
        this.resolveMissingAddresses(index + 1);
      },
      error: () => {
        this.locationAddresses[location.id] = 'Address unavailable';
        this.cdr.detectChanges();
        this.resolveMissingAddresses(index + 1);
      }
    });
  }

  applyFilters(): void {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredLocations = this.locations.filter(location => {
      const matchesText =
        location.name.toLowerCase().includes(term) ||
        (location.address || '').toLowerCase().includes(term);

      const matchesType =
        this.typeFilter === 'ALL' ||
        location.type === this.typeFilter;

      return matchesText && matchesType;
    });
  }

  get activeCount(): number {
    return this.locations.filter(x => x.status === 'ACTIVE').length;
  }

  get inactiveCount(): number {
    return this.locations.filter(x => x.status === 'INACTIVE').length;
  }

  typeLabel(type: WorkLocationType): string {
    return this.locationTypes.find(x => x.value === type)?.label || type;
  }

  openStatusDialog(location: WorkLocation): void {
    this.statusDialogLocation = location;
    this.statusError = '';
    this.activationIp = '';
  }

  closeStatusDialog(): void {
    if (this.statusSaving) return;
    this.statusDialogLocation = null;
    this.statusError = '';
  }

  confirmStatusChange(): void {
    const location = this.statusDialogLocation;
    if (!location || this.statusSaving) return;
    const activate = location.status === 'INACTIVE';
    const newIp = this.activationIp.trim();
    if (activate && location.type === 'OFFICE' && !(location.allowedPublicIps?.length) && !newIp) {
      this.statusError = 'Enter the office public IP before activation.';
      return;
    }
    this.statusSaving = true;
    this.statusError = '';
    const request = activate
      ? this.service.activate(location.id, newIp ? [newIp] : undefined)
      : this.service.deactivate(location.id);
    request.subscribe({
      next: () => {
        this.statusSaving = false;
        this.statusDialogLocation = null;
        this.successMessage = activate
          ? `Work location "${location.name}" activated successfully.`
          : `Work location "${location.name}" deactivated successfully.`;
        this.loadLocations();
      },
      error: (error) => {
        this.statusSaving = false;
        this.statusError = this.getError(error);
        this.cdr.detectChanges();
      }
    });
  }

  openCreateModal(): void {
    this.modalMode = 'create';
    this.editingLocationId = null;
    this.resetForm();
    this.showCreateModal = true;
  }

  openEditModal(location: WorkLocation): void {
    if (location.status !== 'ACTIVE') {
      return;
    }

    this.modalMode = 'edit';
    this.editingLocationId = location.id;
    this.resetForm();

    this.form = {
      name: location.name,
      type: location.type,
      address: location.address || '',
      latitude: Number(location.latitude),
      longitude: Number(location.longitude),
      radiusMeters: location.radiusMeters,
      wifiIpsText: (location.allowedPublicIps || []).join(', ')
    };

    this.selectedPlaceLabel =
      location.address ||
      `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`;

    this.showCreateModal = true;
    this.cdr.detectChanges();
  }

  closeCreateModal(): void {
    if (!this.saving) {
      this.showCreateModal = false;
      this.editingLocationId = null;
    }
  }

  resetForm(): void {
    this.form = {
      name: '',
      type: 'OFFICE',
      address: '',
      latitude: null,
      longitude: null,
      radiusMeters: 100,
    wifiIpsText: ''
    };

    this.locationMethod = 'current';
    this.placeSearchQuery = '';
    this.placeResults = [];
    this.selectedPlaceLabel = '';
    this.locationSearchError = '';
    this.errorMessage = '';
  }

  setLocationMethod(method: 'current' | 'search'): void {
    this.locationMethod = method;
    this.locationSearchError = '';
    this.placeResults = [];
    this.placeSearchQuery = '';
  }

  useCurrentLocation(): void {
    if (!navigator.geolocation) {
      this.locationSearchError =
        'Geolocation is not supported by this browser.';
      return;
    }

    this.detectingLocation = true;

    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.form.latitude = latitude;
        this.form.longitude = longitude;

        this.selectedPlaceLabel =
          `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

        this.service.reverseGeocode(latitude, longitude).subscribe({
          next: result => {
            this.form.address = result.display_name || '';
            this.selectedPlaceLabel =
              result.display_name || this.selectedPlaceLabel;

            this.detectingLocation = false;
            this.cdr.detectChanges();
          },
          error: () => {
            this.detectingLocation = false;
            this.locationSearchError =
              'Coordinates detected, but address lookup failed. Enter the address manually.';
            this.cdr.detectChanges();
          }
        });
      },
      error => {
        this.detectingLocation = false;

        this.locationSearchError =
          error.code === error.PERMISSION_DENIED
            ? 'Location permission denied. Allow browser location access or search for a place.'
            : 'Unable to detect your location. Please try again.';

        this.cdr.detectChanges();
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }
    );
  }

  searchPlace(): void {
    const query = this.placeSearchQuery.trim();

    if (query.length < 3) {
      this.locationSearchError =
        'Enter at least 3 characters.';
      return;
    }

    this.searchingLocation = true;
    this.locationSearchError = '';
    this.placeResults = [];

    this.service.searchPlace(query).subscribe({
      next: results => {
        this.placeResults = results || [];

        if (!this.placeResults.length) {
          this.locationSearchError = 'No places found.';
        }

        this.searchingLocation = false;
        this.cdr.detectChanges();
      },
      error: error => {
        this.locationSearchError = this.getError(error);
        this.searchingLocation = false;
        this.cdr.detectChanges();
      }
    });
  }

  selectPlace(place: NominatimPlace): void {
    this.form.latitude = Number(place.lat);
    this.form.longitude = Number(place.lon);
    this.form.address = place.display_name;

    this.selectedPlaceLabel = place.display_name;
    this.placeResults = [];
    this.locationSearchError = '';

    this.cdr.detectChanges();
  }

  saveLocation(): void {
    this.errorMessage = '';

    if (this.form.name.trim().length < 2) {
      this.errorMessage = 'Location name must contain at least 2 characters.';
      return;
    }

    if (
      this.form.latitude === null ||
      this.form.longitude === null
    ) {
      this.errorMessage = 'Please select a location first.';
      return;
    }

    if (
      this.form.radiusMeters < 10 ||
      this.form.radiusMeters > 5000
    ) {
      this.errorMessage = 'Radius must be between 10 and 5000 metres.';
      return;
    }

    const ips = this.form.wifiIpsText.split(/[\n,]+/).map(x => x.trim()).filter(Boolean);
    if (this.form.type === 'OFFICE' && ips.length === 0) {
      this.errorMessage = 'At least one office public Wi-Fi IP address is required.';
      return;
    }
    const ipv4 = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    if (ips.length > 20 || ips.some(ip => !ipv4.test(ip))) {
      this.errorMessage = 'Enter up to 20 valid public IPv4 addresses separated by commas.';
      return;
    }
    this.saving = true;

    const payload = {
      name: this.form.name.trim(),
      type: this.form.type,
      address: this.form.address.trim() || undefined,
      latitude: this.form.latitude,
      longitude: this.form.longitude,
      radiusMeters: Number(this.form.radiusMeters)
    };

    const request = this.modalMode === 'edit' && this.editingLocationId
      ? this.service.update(this.editingLocationId, payload)
      : this.service.create(payload);

    request.pipe(
      switchMap((response: any) => {
        const id = this.editingLocationId || response?.location?.id;
        if (!id) throw new Error('Location saved, but its ID was not returned. Please edit the location to configure Wi-Fi IPs.');
        return this.service.updateWifiIps(id, ips);
      })
    ).subscribe({
      next: response => {
        this.successMessage =
          response?.message ||
          (this.modalMode === 'edit'
            ? 'Work location updated successfully.'
            : 'Work location created successfully.');

        this.showCreateModal = false;
        this.editingLocationId = null;
        this.saving = false;
        this.loadLocations();
        this.cdr.detectChanges();
      },
      error: error => {
        this.errorMessage = this.getError(error);
        this.saving = false;
        this.cdr.detectChanges();
      }
    });
  }

  async deactivateLocation(location: WorkLocation): Promise<void> {
    if (location.status !== 'ACTIVE') {
      return;
    }

    const confirmed = await this.uiFeedback.confirm({
      title: 'Deactivate work location?',
      message: `Deactivate "${location.name}"? It will no longer be available for new employee assignments.`,
      confirmLabel: 'Deactivate',
      tone: 'warning'
    });

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.service.deactivate(location.id).subscribe({
      next: response => {
        this.successMessage =
          response?.message || 'Work location deactivated successfully.';
        this.loadLocations();
        this.cdr.detectChanges();
      },
      error: error => {
        this.errorMessage = this.getError(error);
        this.cdr.detectChanges();
      }
    });
  }

  submitAssignment(): void {
    this.assignmentError = '';
    this.assignmentSuccess = '';

    const employeeId = this.assignmentForm.employeeProfileId.trim();
    const locationId = this.assignmentForm.workLocationId;

    if (!employeeId || !locationId) {
      this.assignmentError =
        'Employee Profile ID and work location are required.';
      return;
    }

    this.assigning = true;

    if (this.assignmentMode === 'permanent') {
      this.service.assignPermanent(employeeId, locationId).subscribe({
        next: response => {
          this.assignmentSuccess =
            (response as any)?.message || 'Permanent location assigned.';
          this.assigning = false;
          this.cdr.detectChanges();
        },
        error: error => {
          this.assignmentError = this.getError(error);
          this.assigning = false;
          this.cdr.detectChanges();
        }
      });

      return;
    }

    if (!this.assignmentForm.startAt || !this.assignmentForm.endAt) {
      this.assignmentError = 'Start and end dates are required.';
      this.assigning = false;
      return;
    }

    const start = new Date(this.assignmentForm.startAt);
    const end = new Date(this.assignmentForm.endAt);

    if (end <= start) {
      this.assignmentError = 'End time must be later than start time.';
      this.assigning = false;
      return;
    }

    this.service.assignTemporary(employeeId, {
      workLocationId: locationId,
      startAt: start.toISOString(),
      endAt: end.toISOString(),
      reason: this.assignmentForm.reason.trim() || undefined
    }).subscribe({
      next: response => {
        this.assignmentSuccess =
          (response as any)?.message || 'Temporary location assigned.';
        this.assigning = false;
        this.cdr.detectChanges();
      },
      error: error => {
        this.assignmentError = this.getError(error);
        this.assigning = false;
        this.cdr.detectChanges();
      }
    });
  }

  private getError(error: any): string {
    const message = error?.error?.message;

    return Array.isArray(message)
      ? message.join(', ')
      : message || 'Something went wrong. Please try again.';
  }
}
