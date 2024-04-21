export interface City {
    id:         number;
    name:       string;
    coord:      Coord;
    country:    string;
    population: number;
    timezone:   number;
}

export interface Coord {
    lon: number;
    lat: number;
}
