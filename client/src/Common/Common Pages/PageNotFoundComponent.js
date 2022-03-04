// REACT IMPORTS
import React from 'react';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Box, Container, Paper, Typography, Button } from '@mui/material';

// COMPONENT IMPORTS
import useStyles from './CommonStyles';
import errorImage from '../Images/error-404.png';
import { DrawerHeader } from '../Utils/MUI Utils/LayoutUtils';

const PageNotFoundComponent = () => {
  const commonClasses = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container component='main' maxWidth='xs'>
          <Paper className={commonClasses.paper} elevation={3}>
            <div className={commonClasses.topAndBottomMargin}>
              <img src={errorImage} alt='Page Not Found' height='100' width='100' />
            </div>
            <Typography variant='h6'>Page Not Found</Typography>
            <div className={commonClasses.topAndBottomMargin}>
              <Button variant='contained' onClick={() => navigate('/home')} className={commonClasses.image}>
                Back to Home
              </Button>
            </div>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PageNotFoundComponent;
