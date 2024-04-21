import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Forecast } from "@forecast/models";
import { WeatherService } from "@forecast/services";
import { of } from "rxjs";


export const forecastResolver: ResolveFn<Forecast | null> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
) => {
    const zipCode = route.paramMap.get('zipCode');

    if (!zipCode) {
        return of(null);
    }

    return inject(WeatherService).selectForecast(zipCode);
}
