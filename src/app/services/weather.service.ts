import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@forecast/services';
import { ConditionsGeneralInfo, ConditionsMap, Forecast } from '@forecast/models';

@Injectable()
export class WeatherService {
  private apiService = inject(ApiService);

  private weatherConditions$ = new BehaviorSubject<Map<string, ConditionsGeneralInfo>>(new Map());

  addConditions(zipCode: string): void {
    this.apiService.fetchWeatherConditions(zipCode)
      .subscribe(data => {
        const currentConditions = this.weatherConditions$.getValue();
        currentConditions.set(zipCode, data);
        this.weatherConditions$.next(currentConditions);
      });
  }

  removeConditions(zipCode: string) {
    const currentConditions = this.weatherConditions$.getValue();
    if (currentConditions.delete(zipCode)) {
      this.weatherConditions$.next(currentConditions);
    }
  }

  selectWeatherConditions(): Observable<ConditionsMap[]> {
    return this.weatherConditions$.asObservable().pipe(
      map(conditionsMap => Array.from(conditionsMap).map(([zipCode, conditions]) => ({
        zip: zipCode,
        data: conditions,
      })))
    );
  }

  selectForecast(zipCode: string): Observable<Forecast> {
    return this.apiService.fetchForecast(zipCode);
  }
}
