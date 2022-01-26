// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { Typography } from '@mui/material';

// COMPONENT IMPORTS
import useLayoutStyles from '../Layout/LayoutStyles';

const StocksComponent = () => {
  // const homeClasses = useHomeStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <div className={layoutClasses.allLayoutMargins}>
      <Typography paragraph>STOCKS</Typography>
    </div>
  );
};

export default StocksComponent;
