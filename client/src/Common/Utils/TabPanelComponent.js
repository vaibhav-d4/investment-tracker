// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { Box } from '@mui/material';

const TabPanelComponent = (props) => {
  const { children, value, index } = props;
  return <>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</>;
};

export default TabPanelComponent;
