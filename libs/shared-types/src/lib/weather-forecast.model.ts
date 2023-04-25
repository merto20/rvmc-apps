export interface WeatherForecast {
  area_metadata: AreaMetadata[];
  items: Item[];
  api_info: ApiInfo;
}

export interface ApiInfo {
  status: string;
}

export interface Item {
  update_timestamp: string;
  timestamp: string;
  valid_period: ValidPeriod;
  forecasts: Forecast[];
}

export interface Forecast {
  area: string;
  forecast: string;
}

export interface ValidPeriod {
  start: string;
  end: string;
}

export interface AreaMetadata {
  name: string;
  label_location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}