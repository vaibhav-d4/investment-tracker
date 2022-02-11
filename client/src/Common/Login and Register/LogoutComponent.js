// REACT IMPORTS
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Box, Container, Paper, Typography, Button } from '@mui/material';

// COMPONENT IMPORTS
import useStyles from '../Common Pages/CommonStyles';
import { DrawerHeader } from '../Utils/LayoutUtils';
import sessionExpire from '../Images/sessionExpire.png';
import logout from '../Images/logout.png';

const LogoutComponent = () => {
  const commonClasses = useStyles();
  const navigate = useNavigate();

  const isSessionExpired = useSelector((state) => state.loginAndRegister.isSessionExpired);

  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container component='main' maxWidth='xs'>
          <Paper className={commonClasses.paper} elevation={3}>
            <div className={commonClasses.topAndBottomMargin}>
              {isSessionExpired ? (
                <img src={sessionExpire} alt='Page Not Found' height='100' width='100' />
              ) : (
                <img src={logout} alt='Page Not Found' height='100' width='100' />
              )}
            </div>
            {isSessionExpired ? (
              <>
                <Typography variant='h6'>Session has expired.</Typography>
                <Typography variant='h6'>Please Login to continue.</Typography>
              </>
            ) : (
              <Typography variant='h6'>You have been successfully logged out.</Typography>
            )}
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

export default LogoutComponent;
