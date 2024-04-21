import { City } from "./city";
import { Wind, Sun, WeatherBasic, Temp, DayTime } from "./weather";

export interface Forecast {
    city:    City;
    cod:     string;
    message: number;
    cnt:     number;
    list:    DailyConditions[];
}

export interface DailyConditions extends Wind, Sun, WeatherBasic<Temp, DayTime> {
    dt:         number;
    weather:    Weather[];
    clouds:     number;
    pop:        number;
    rain?:      number;
}

export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}