// REACT IMPORTS
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Box, Container, Grid, Paper, Button, Typography, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// COMPONENT IMPORTS
import useAuthStyles from './AuthStyles';
import useCommonStyles from '../Common Pages/CommonStyles';
import { DrawerHeader } from '../Utils/MUI Utils/LayoutUtils';
import InputFieldComponent from '../Utils/Component Utils/InputFieldComponent';
import GoogleLoginComponent from './GoogleLoginComponent';
import login from '../Images/login.png';

// COMPONENT REDIX IMPORTS
import {
  toggleUserIsToRegisterAction,
  formUserDataAction,
  loginAction,
  registerAction,
  formHasErrorAction,
  initialFormDataAction,
  loadingForButtonAction,
  isSessionExpiredAction,
} from '../../Redux/Login and Register Redux/LoginAndRegisterAction';

const LoginAndRegisterComponent = () => {
  const authClasses = useAuthStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const userIsToRegister = useSelector((state) => state.loginAndRegister.userIsToRegister);
  const formData = useSelector((state) => state.loginAndRegister.userInitialData);
  const formHasError = useSelector((state) => state.loginAndRegister.formHasError);
  const formErrorData = useSelector((state) => state.loginAndRegister.formErrorData);
  const loadingForButton = useSelector((state) => state.loginAndRegister.loadingForButton);

  // Set FormData as empty whenever this page loads up and change back to the login screen
  // Set register page or login page according to the URL
  // Set login and register button loading state to false
  useEffect(() => {
    dispatch(initialFormDataAction());
    dispatch(formHasErrorAction(false));
    dispatch(loadingForButtonAction(false));
    if (window.location.pathname === '/login') {
      dispatch(toggleUserIsToRegisterAction(false));
    } else if (window.location.pathname === '/register') {
      dispatch(toggleUserIsToRegisterAction(true));
    }
  }, [dispatch]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    dispatch(formHasErrorAction(false));
    dispatch(formUserDataAction({ ...formData, [e.target.name]: e.target.value }));
  };

  // Main login or register form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loadingForButtonAction(true));
    dispatch(isSessionExpiredAction(false));
    if (userIsToRegister) {
      dispatch(registerAction(formData, navigate));
    } else {
      dispatch(loginAction(formData, navigate));
    }
  };

  const toggleLoginAndRegister = () => {
    dispatch(initialFormDataAction());
    dispatch(toggleUserIsToRegisterAction(!userIsToRegister));
    dispatch(formHasErrorAction(false));
    if (!userIsToRegister) navigate('/register');
    else navigate('/login');
  };

  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container component='main' maxWidth='xs'>
          <Paper className={authClasses.paper} elevation={3}>
            <div className={commonClasses.topAndBottomMargin}>
              <img src={login} alt='Page Not Found' height='50' width='50' />
            </div>
            <div className={authClasses.loginText}>
              <Typography variant='h5'>{userIsToRegister ? 'Register' : 'Login'}</Typography>
            </div>
            <form className={authClasses.form} onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                {userIsToRegister && (
                  <>
                    <InputFieldComponent
                      name='firstName'
                      label='First Name'
                      handleChange={handleInputChange}
                      required
                      half
                      value={formData.firstName}
                    />
                    <InputFieldComponent
                      name='lastName'
                      label='Last Name'
                      handleChange={handleInputChange}
                      half
                      value={formData.lastName}
                    />
                  </>
                )}
                <InputFieldComponent
                  name='email'
                  label='Email'
                  type='email'
                  handleChange={handleInputChange}
                  required
                  value={formData.email}
                />
                <InputFieldComponent
                  name='password'
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  handleChange={handleInputChange}
                  handleShowPassword={toggleShowPassword}
                  required
                  value={formData.password}
                />
                {userIsToRegister && (
                  <InputFieldComponent
                    name='confirmPassword'
                    label='Repeat Password'
                    handleChange={handleInputChange}
                    type='password'
                    required
                    value={formData.confirmPassword}
                  />
                )}
              </Grid>
              {formHasError && (
                <Alert className={authClasses.formErrorAlert} severity='error'>
                  {formErrorData.message || formErrorData.error}
                </Alert>
              )}
              <div className={authClasses.submit}>
                <LoadingButton loading={loadingForButton} type='submit' fullWidth variant='contained' color='primary'>
                  {userIsToRegister ? 'Register' : 'Login'}
                </LoadingButton>
              </div>
              {!userIsToRegister && <GoogleLoginComponent />}
              <Grid container justifyContent='flex-end'>
                <Grid item>
                  <Button onClick={toggleLoginAndRegister}>
                    {userIsToRegister ? 'Login to Existing Account' : 'Create a new Account'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default LoginAndRegisterComponent;
