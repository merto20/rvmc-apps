import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import Image from 'next/image';
import { CameraData } from '@rvmc-apps/shared-types';

export interface TrafficImageListProps {
  images: CameraData[]
}

export function TrafficImageList(props: TrafficImageListProps) {
  return (
    <ImageList
      className='h-[450px] w-full'
      rowHeight={200}
      gap={1}
    >
      {props.images.map((item) => {
        const cols = props.images.length > 10 ? 1 : 2;
        return (
          <ImageListItem key={item.image_id} cols={cols} rows={cols}>
            <Image
              className='text-center'
              src={item.image}
              width={250 * cols}
              height={200 * cols}
              alt={item.area}
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              title={item.area}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  aria-label={`camera ${item.area}`}
                >
                  <PhotoCameraFrontIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

export default TrafficImageList;