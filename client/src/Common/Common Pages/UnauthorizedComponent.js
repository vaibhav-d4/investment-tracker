// REACT IMPORTS
import React from 'react';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Box, Container, Paper, Typography, Button } from '@mui/material';

// COMPONENT IMPORTS
import useStyles from './CommonStyles';
import unauthorizedImage from '../Images/unauthorized.png';
import { DrawerHeader } from '../Utils/LayoutUtils';

const UnauthorizedComponent = () => {
  const commonClasses = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container component='main' maxWidth='xs'>
          <Paper className={commonClasses.paper} elevation={3}>
            <div className={commonClasses.topAndBottomMargin}>
              <img src={unauthorizedImage} alt='unauthorized' height='100' width='100' />
            </div>
            <Typography variant='h6'>Please Login to Continue</Typography>
            <div className={commonClasses.topAndBottomMargin}>
              <Button variant='contained' onClick={() => navigate('/login')} className={commonClasses.image}>
                Login
              </Button>
            </div>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default UnauthorizedComponent;
