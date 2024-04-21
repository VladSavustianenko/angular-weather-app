import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { APPID, ConditionsGeneralInfo, Forecast, URL } from "@forecast/models";
import { Observable } from "rxjs";

/**
 * @description
 * Use 'cacheDuration' parameter to specify the number of seconds HTTP responses should be cached.
 * If the parameter is not provided the response won't be cached.
 */
@Injectable()
export class ApiService {
    private http = inject(HttpClient);

    fetchWeatherConditions(zipCode: string) {
        return this.http.get<ConditionsGeneralInfo>(`${URL}/weather?zip=${zipCode},us&units=imperial&APPID=${APPID}`, { params: { cacheDuration: 30 } });
    }

    fetchForecast(zipCode: string): Observable<Forecast> {
        return this.http.get<Forecast>(`${URL}/forecast/daily?zip=${zipCode},us&units=imperial&cnt=5&APPID=${APPID}`, { params: { cacheDuration: 30 } });
    }
}
