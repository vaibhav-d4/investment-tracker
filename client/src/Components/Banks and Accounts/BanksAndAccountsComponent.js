// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { Typography } from '@mui/material';

// COMPONENT IMPORTS
import useLayoutStyles from '../Layout/LayoutStyles';

const BanksAndAccountsComponent = () => {
  // const homeClasses = useHomeStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <div className={layoutClasses.allLayoutMargins}>
      <Typography paragraph>BANKS AND ACCOUNTS</Typography>
    </div>
  );
};

export default BanksAndAccountsComponent;
