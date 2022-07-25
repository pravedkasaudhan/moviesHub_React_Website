import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';


const useStyles=makeStyles({
  root:{
    // width:"100%",
    position:"fixed",
    bottom:0,
    backgroundColor:"black"
  }
});
export default function SimpleBottomNavigation() {
  const classes=useStyles();
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {

    if (value === 0) navigate("/");
    else if (value === 1) navigate("/movies");
    else if (value === 2) navigate("/tvShow");
    else navigate("/search");
    // eslint-disable-next-line
  }, [value])
  return (
    // <Box sx={{
    //   width: "100%",
    //   position: "fixed",
    //   bottom: 0,
      
    //   zIndex:100
    // }}>
      <BottomNavigation
      value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        // className={classes.root}
      >

        <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />

        <BottomNavigationAction label="Movies" icon={<MovieIcon />} />

        <BottomNavigationAction label="TV Show" icon={<LiveTvIcon />} />

        <BottomNavigationAction label="Search" icon={<SearchIcon />} />

      </BottomNavigation>
    // </Box>
  );
}
