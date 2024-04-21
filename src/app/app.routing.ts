import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastsListComponent, MainPageComponent } from '@forecast/components';
import { forecastResolver } from '@forecast/services';

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'forecast/:zipCode',
    component: ForecastsListComponent,
    resolve: {
      forecast: forecastResolver,
    },
  }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
