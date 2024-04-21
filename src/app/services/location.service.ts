import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const LOCATIONS : string = 'locations';

@Injectable()
export class LocationStoreService {
  private locationZipCodes = new Set<string>();
  private locationAdd$ = new Subject<string>();
  private locationRemove$ = new Subject<string>();

  get zipCodeList() {
    return [ ...this.locationZipCodes ];
  }

  get locationAddListener(): Observable<string> {
    return this.locationAdd$.asObservable();
  }

  get locationRemoveListener(): Observable<string> {
    return this.locationRemove$.asObservable();
  }

  constructor() {
    this.loadStoredLocationCodes();
  }

  addLocation(zipcode : string) {
    this.locationZipCodes.add(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.zipCodeList));

    this.locationAdd$.next(zipcode);
  }

  removeLocation(zipCode : string) {
    this.locationZipCodes.delete(zipCode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.zipCodeList));

    this.locationRemove$.next(zipCode);
  }

  private loadStoredLocationCodes() {
    const locations = localStorage.getItem(LOCATIONS);
    if (locations) {
      const locationsList = JSON.parse(locations);
      
      if (Array.isArray(locationsList)) {
        locationsList.forEach(code => this.locationZipCodes.add(code));
      }
    }
  }
}
