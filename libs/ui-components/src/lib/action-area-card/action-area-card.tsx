import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

/* eslint-disable-next-line */
export interface ActionAreaCardProps {
  area: string;
  forecast: string;
}

export function ActionAreaCard(props: ActionAreaCardProps) {
  return (
    <Card className='max-w-full'>
      <CardActionArea>
        <CardMedia
          className='h-[100px]'
          component="img"
          height="100"
          image="/images/weather_forecast.jpg"
          alt="weather forecast"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Weather Forecast
          </Typography>
          <Typography variant="h4" color="text.secondary">
            {props.area} will be {props.forecast}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;