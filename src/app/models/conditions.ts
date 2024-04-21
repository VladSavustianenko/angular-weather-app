import { Coord } from "./city";
import { Weather } from "./forecast";
import { WeatherMainInfo, Wind, Clouds, Sun } from "./weather";

export interface ConditionsGeneralInfo {
    coord:      Coord;
    weather:    Weather[];
    base:       string;
    main:       WeatherMainInfo;
    visibility: number;
    wind:       Wind;
    clouds:     Clouds;
    dt:         number;
    sys:        Sys;
    timezone:   number;
    id:         number;
    name:       string;
    cod:        number;
}

export interface Sys extends Sun {
    type:    number;
    id:      number;
    country: string;
}

export interface ConditionsMap {
    zip:  string;
    data: ConditionsGeneralInfo;
}
