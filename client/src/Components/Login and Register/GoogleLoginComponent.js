// REACT IMPORTS
import React from 'react';
import { GoogleLogin } from 'react-google-login';

// MUI IMPORTS
import { Button } from '@mui/material';

// COMPONENT IMPORTS
import useStyles from './AuthStyles';
import GoogleIcon from './GoogleIcon';

const GoogleLoginComponent = () => {
  const googleClasses = useStyles();

  const googleSuccess = async (res) => {
    console.log(res);
  };

  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <div className={googleClasses.googleButton}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        render={(renderProps) => (
          <Button
            color='primary'
            fullWidth
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<GoogleIcon />}
            variant='contained'
          >
            Google Sign In
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy='single_host_origin'
      />
    </div>
  );
};

export default GoogleLoginComponent;
