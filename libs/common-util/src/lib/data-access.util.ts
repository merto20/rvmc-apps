import { AreaMetadata, Location } from '@rvmc-apps/shared-types';

export async function getLocationName(location: Location, areaMetaData: AreaMetadata[]): Promise<string> {
  const res = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}&localityLanguage=en`,
  );

  const geoData = await res.json();
  const locations = geoData.localityInfo.informative.filter(i => !i.description);
  const matched = areaMetaData.find(a => locations.find(l => l.name === a.name));

  return matched?.name;
}

export function fetchWeatherForecastData(dateTime: string) {
  if (dateTime) {
    return fetch(
      `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${encodeURIComponent(dateTime)}`
    );
  } else {
    return fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast');
  }
}

export function fetchTrafficImagesData(dateTime: string) {
  if (dateTime) {
    return fetch(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${encodeURIComponent(dateTime)}`);
  } else {
    return fetch('https://api.data.gov.sg/v1/transport/traffic-images');
  }
}