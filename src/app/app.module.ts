import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ForecastFormComponent } from './components/forecast-form/forecast-form.component';
import { LocationStoreService } from "./services/location.service";
import { ForecastsListComponent } from './components/forecasts-list/forecasts-list.component';
import { WeatherService } from "./services/weather.service";
import { WeatherConditionsComponent } from './components/weather-conditions/weather-conditions.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RouterModule } from "@angular/router";
import { routing } from "./app.routing";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ApiService } from './services/api.service';
import { SharedModule } from './shared/shared.module';
import { CacheInterceptor } from './services/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ForecastFormComponent,
    ForecastsListComponent,
    WeatherConditionsComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),

    SharedModule,
  ],
  providers: [
    LocationStoreService,
    WeatherService,
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
