import { List, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import { AreaMetadata } from "@rvmc-apps/shared-types";
import { useState } from "react";

/* eslint-disable-next-line */
export interface ListLocationProps {
  areaMetadata: AreaMetadata[];
  onSelectedChanged: any;
}

export function ListLocation(props: ListLocationProps) {
  const [selectedItem, setSelectedItem] = useState('');
  return (
    <List
      subheader={
        <ListSubheader className='bg-slate-300' component="div">
          Select location:
        </ListSubheader>
    }
    >
      {props.areaMetadata.map(area => (
        <ListItemButton key={area.name} selected={selectedItem === area.name} onClick={() => {
          props.onSelectedChanged(area);
          setSelectedItem(area.name)
        }}>
          <ListItemText primary={area.name} />
        </ListItemButton>
      ))}
      
    </List>
  );
}

export default ListLocation;
