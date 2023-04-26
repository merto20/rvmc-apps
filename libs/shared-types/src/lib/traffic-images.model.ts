import { Location } from './weather-forecast.model';

export interface TrafficImages {
  items: ImageItem[];
}

export interface ImageItem {
  timestamp: string;
  cameras: CameraData[];
}

export interface CameraData {
  timestamp: string;
  camera_id: number;
  image_id: number;
  image: string;
  image_metadata: ImageMetadata;
  location: Location;
  area: string;
}

export interface ImageMetadata {
  height: number;
  width: number;
  md5: string;
}