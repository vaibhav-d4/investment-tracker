// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { Typography } from '@mui/material';

// COMPONENT IMPORTS
import useLayoutStyles from '../Layout/LayoutStyles';

const MutualFundsComponent = () => {
  // const homeClasses = useHomeStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <div className={layoutClasses.allLayoutMargins}>
      <Typography paragraph>MUTUAL FUNDS</Typography>
    </div>
  );
};

export default MutualFundsComponent;
