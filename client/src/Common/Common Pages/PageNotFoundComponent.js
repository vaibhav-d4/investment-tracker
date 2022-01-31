// REACT IMPORTS
import React from 'react';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Box, Container, Paper, Typography, Button } from '@mui/material';

// COMPONENT IMPORTS
import useStyles from './UnauthorizeStyles';
import errorImage from '../Images/error-404.png';
import { DrawerHeader } from '../Utils/LayoutUtils';

const PageNotFoundComponent = () => {
  const unauthorizeClasses = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container component='main' maxWidth='xs'>
          <Paper className={unauthorizeClasses.paper} elevation={3}>
            <div className={unauthorizeClasses.topAndBottomMargin}>
              <img src={errorImage} alt='Page Not Found' height='100' width='100' />
            </div>
            <Typography variant='h6'>Page Not Found</Typography>
            <div className={unauthorizeClasses.topAndBottomMargin}>
              <Button variant='contained' onClick={() => navigate('/home')} className={unauthorizeClasses.image}>
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
