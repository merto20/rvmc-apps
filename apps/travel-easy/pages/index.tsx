import path from 'path';
import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { WeatherForecast } from '@rvmc-apps/shared-types';
import { ListLocation } from '@rvmc-apps/ui-components';
import { List, ListItemButton, ListItemText, ListSubheader, TextField } from '@mui/material';

path.resolve('./next.config.js');

export function Index({ dt, d, data: initialData }: { dt: string; d: string; data: WeatherForecast }) {
  const [dateTime, setDateTime] = useState(dt);
  const [date, setDate] = useState(d);
  const [weatherData, setWetherForecast] = useState<WeatherForecast>(initialData);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    if (dateTime && date) {
      fetch(
        `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${encodeURIComponent(dateTime)}&date=${encodeURIComponent(date)}`,
      )
        .then(resp => resp.json())
        .then(data => setWetherForecast(data));
    } else {
      fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast')
        .then(resp => resp.json())
        .then(data => setWetherForecast(data));
    }
  }, [dateTime, date]);

  const onSetDateTime = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(evt.target.value);
  }, []);

  const onSetDate = useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
    setDate(evt.target.value);
  }, []);

  return (
    <section className="py-20 flex text-center justify-center h-screen w-full">
      <div className='w-[896px] shadow-2xl'>
        <div className='p-5 flex gap-5'>
          <TextField value={dateTime} onChange={onSetDateTime} label="Date Time" variant="filled" />
          <TextField value={date} onChange={onSetDate} label="Date" variant="filled" />
        </div>
        <div className='overflow-y-auto h-[85%] w-1/2'>
          <ListLocation areaMetadata={weatherData?.area_metadata} onSelectedChanged={(area: SetStateAction<string>) => setSelectedLocation(area)}></ListLocation>
        </div>
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  let data!: WeatherForecast;
  if (context.query.date_time && context.query.date) {
    const res = await fetch(
      `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${encodeURIComponent(
        context.query.date_time,
      )}&date=${encodeURIComponent(context.query.date)}`,
    );
    data = await res.json();
  } else {
    const res = await fetch('https://api.data.gov.sg/v1/environment/2-hour-weather-forecast');
    data = await res.json();
  }

  return {
    props: {
      dt: context.query.date_time ?? '',
      d: context.query.date ?? '',
      data,
    },
  };
}

export default Index;
