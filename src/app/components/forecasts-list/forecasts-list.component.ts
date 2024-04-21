import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from '@forecast/models';
import { WeatherUIService } from '@forecast/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);

  private routeSubscription?: Subscription;

  protected readonly getWeatherIcon = WeatherUIService.getWeatherIcon;

  forecast: Forecast | null = null;

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.data.subscribe(({ forecast }) => {
      this.forecast = forecast;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }
}
