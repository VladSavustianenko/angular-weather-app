import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConditionsMap } from '@forecast/models';
import { LocationStoreService, WeatherService } from '@forecast/services';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit, OnDestroy {
  private locationStoreService = inject(LocationStoreService);
  private weatherService = inject(WeatherService);
  private router = inject(Router);

  private destroySubject$ = new Subject<void>()
  
  protected currentConditions$: Observable<ConditionsMap[]> = this.weatherService.selectWeatherConditions();

  ngOnInit(): void {
    this.loadConditions();

    this.locationStoreService.locationAddListener
      .pipe(takeUntil(this.destroySubject$))
      .subscribe((zipCode) => this.weatherService.addConditions(zipCode));
    
    this.locationStoreService.locationRemoveListener
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(zipCode => this.weatherService.removeConditions(zipCode));
  }

  ngOnDestroy(): void {
    this.destroySubject$.next()
  }

  onAddLocation(zipCode : string) {
    if (this.locationStoreService.zipCodeList.includes(zipCode)) {
      return;
    }

    this.locationStoreService.addLocation(zipCode);
  }

  removeCondition(zipCode: string) {
    this.locationStoreService.removeLocation(zipCode);
  }

  navigateToForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode]);
  }

  private loadConditions() {
    this.currentConditions$.pipe(takeUntil(this.destroySubject$)).subscribe((data) => {
      if (data.length) {
        return;
      }

      this.locationStoreService.zipCodeList
        .forEach(zipCode => this.weatherService.addConditions(zipCode));
    })
  }
}
