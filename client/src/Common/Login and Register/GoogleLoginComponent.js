// REACT IMPORTS
import React from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Button } from '@mui/material';

// COMPONENT IMPORTS
import useStyles from './AuthStyles';
import GoogleIcon from './GoogleIcon';

// COMPONENT REDIX IMPORTS
import { googleLoginAction } from '../../Redux/Login and Register Redux/LoginAndRegisterAction';

const GoogleLoginComponent = () => {
  const googleClasses = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSuccess = async (res) => {
    dispatch(googleLoginAction(res, navigate));
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
