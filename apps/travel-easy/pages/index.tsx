import path from 'path';
import { useCallback, useEffect, useState } from 'react';
import { AreaMetadata, CameraData, TrafficImages, WeatherForecast } from '@rvmc-apps/shared-types';
import { ListLocation, ActionAreaCard, TrafficImageList } from '@rvmc-apps/ui-components';
import { Button, TextField, Typography } from '@mui/material';
import { getLocationName, fetchWeatherForecastData, fetchTrafficImagesData } from '@rvmc-apps/common-util';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

path.resolve('./next.config.js');

export function Index({
  dt,
  d,
  weatherData: initialWeatherData,
  trafficData: initialTrafficData,
}: {
  dt: string;
  d: string;
  weatherData: WeatherForecast;
  trafficData: TrafficImages;
}) {
  const [dateTime, setDateTime] = useState(dt);
  const [date, setDate] = useState(d);
  const [weatherData, setWetherForecast] = useState<WeatherForecast>(initialWeatherData);
  const [trafficImages, setTrafficImages] = useState<TrafficImages>(initialTrafficData);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [forecast, setForecast] = useState('');
  const [selectedCameraData, setSelectedCameraData] = useState<CameraData[]>([]);
  const [searchCounter, setSearchCounter] = useState(0);

  useEffect(() => {
    const promiseList = [
      fetchWeatherForecastData(dateTime, date),
      fetchTrafficImagesData(dateTime),
    ];
    Promise.all(promiseList).then(async responses => {
      const weatherData: WeatherForecast = await responses[0].json();
      const trafficData: TrafficImages = populateLocationName(await responses[1].json(), weatherData.area_metadata);
      setWetherForecast(weatherData);
      setTrafficImages(trafficData);
    });
  }, [searchCounter]);

  const onSetDateTime = useCallback((value: Dayjs) => {
    setDateTime(value.format('YYYY-MM-DD[T]HH:mm:ss'));
    setDate(value.format('YYYY-MM-DD'));
  }, []);

  const onSelectedChanged = (area: AreaMetadata) => {
    setSelectedLocation(area.name);
    const forecast = weatherData.items[0]?.forecasts.find(f => f.area === area.name);
    if (forecast) setForecast(forecast.forecast);
    const images = trafficImages.items[0].cameras.filter(c => c.area === area.name);
    setSelectedCameraData(images);
  };

  return (
    <section className="py-20 px-10 flex text-center justify-center h-screen w-full">
      <div className="w-[896px]">
        <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4'>
          <div className="md:col-span-2 sm:col-span-1 flex gap-5 justify-start">
            <DateTimePicker value={dayjs(dateTime, 'YYYY-MM-DD[T]HH:mm:ss')} label="Date Time" onChange={onSetDateTime}/>
            <Button variant="outlined" onClick={() => setSearchCounter(searchCounter + 1)}>Search</Button>
          </div>
          <div className="md:col-span-2 sm:col-span-1 overflow-y-auto md:h-[500px] h-[300px]">
            <ListLocation areaMetadata={weatherData?.area_metadata} onSelectedChanged={onSelectedChanged}></ListLocation>
          </div>
          {selectedLocation && (
            <>
              <div className='sm:col-span-1'>
                <ActionAreaCard area={selectedLocation} forecast={forecast}></ActionAreaCard>
              </div>
              <div className='md:col-span-2 sm:col-span-1'>
                <Typography gutterBottom variant="h5" component="div">
                  Traffic Situation in {selectedLocation}
                </Typography>
                <TrafficImageList images={selectedCameraData}></TrafficImageList>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function populateLocationName(trafficData: TrafficImages, areaMetaData: AreaMetadata[]) {
  trafficData.items[0].cameras.forEach(async c => {
    c.area = await getLocationName(c.location, areaMetaData)
  });
  return trafficData;
}

export async function getServerSideProps(context: { query: { date_time: string; date: string} }) {
  const promiseList = [
    fetchWeatherForecastData(context.query.date_time, context.query.date),
    fetchTrafficImagesData(context.query.date_time),
  ];

  const responses = await Promise.all(promiseList);
  const weatherData: WeatherForecast = await responses[0].json();
  const trafficData: TrafficImages = populateLocationName(await responses[1].json(), weatherData.area_metadata);

  return {
    props: {
      dt: context.query.date_time ?? '',
      d: context.query.date ?? '',
      weatherData: weatherData,
      trafficData: trafficData,
    },
  };
}

export default Index;
