// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { Typography } from '@mui/material';

// COMPONENT IMPORTS
import useLayoutStyles from '../Layout/LayoutStyles';

const GoldComponent = () => {
  // const homeClasses = useHomeStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <div className={layoutClasses.allLayoutMargins}>
      <Typography paragraph>GOLD</Typography>
    </div>
  );
};

export default GoldComponent;
