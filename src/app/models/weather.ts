export interface Clouds {
    all: number;
}

export interface WeatherMainInfo extends WeatherBasic<number, number> {
    temp_min:   number;
    temp_max:   number;
}

export interface WeatherBasic<Temp, FeelsLike> {
    temp:       Temp;
    feels_like: FeelsLike;
    pressure:   number;
    humidity:   number;
}

export interface Wind {
    speed: number;
    deg:   number;
    gust:  number;
}

export interface Sun {
    sunrise: number;
    sunset:  number;
}

export interface Temp extends DayTime {
    min:   number;
    max:   number;
}

export interface DayTime {
    day:   number;
    night: number;
    eve:   number;
    morn:  number;
}
