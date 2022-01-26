// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { Typography } from '@mui/material';

// COMPONENT IMPORTS
import useHomeStyles from './HomeStyles';
import useLayoutStyles from '../Layout/LayoutStyles';

const HomeComponent = () => {
  const homeClasses = useHomeStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <div className={layoutClasses.allLayoutMargins}>
      <Typography paragraph>HOME</Typography>
    </div>
  );
};

export default HomeComponent;
