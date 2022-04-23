// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { Box, Grid } from '@mui/material';

// COMPONENT IMPORTS
import CategoriesComp from './CategoriesComp';

const AccountsComponent = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <CategoriesComp />
          </Grid>
          <Grid item xs={12} md={6}>
            Graph has to be Added.
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AccountsComponent;
