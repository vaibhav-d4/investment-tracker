// REACT IMPORTS
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// MUI IMPORTS
import { Avatar, Box, Container, Grid, Paper, Button, Typography } from '@mui/material';

// MUI ICONS IMPORTS
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// COMPONENT IMPORTS
import useAuthStyles from './AuthStyles';
import { DrawerHeader } from '../Utils/LayoutUtils';
import InputFieldComponent from './InputFieldComponent';
import GoogleLoginComponent from './GoogleLoginComponent';

// COMPONENT REDIX IMPORTS
import {
  toggleUserIsToRegisterAction,
  formUserDataAction,
  loginAction,
  registerAction,
} from '../../Redux/Login and Register Redux/LoginAndRegisterAction';

// Initial user data when page loads or reopens
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const LoginAndRegisterComponent = () => {
  const authClasses = useAuthStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const userIsToRegister = useSelector((state) => state.loginAndRegister.userIsToRegister);

  const formData = useSelector((state) => state.loginAndRegister.userInitialData);

  // Set FormData as empty whenever this page loads up and change back to the login screen
  // Set register page or login page according to the URL
  useEffect(() => {
    dispatch(formUserDataAction(initialFormData));
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
    dispatch(formUserDataAction({ ...formData, [e.target.name]: e.target.value }));
  };

  // Main login or register form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userIsToRegister) {
      dispatch(registerAction(formData, navigate));
    } else {
      dispatch(loginAction(formData, navigate));
    }
  };

  const toggleLoginAndRegister = () => {
    dispatch(toggleUserIsToRegisterAction(!userIsToRegister));
    if (!userIsToRegister) navigate('/register');
    else navigate('/login');
  };

  return (
    <>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container component='main' maxWidth='xs'>
          <Paper className={authClasses.paper} elevation={3}>
            <Avatar className={authClasses.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{userIsToRegister ? 'Register' : 'Login'}</Typography>
            <form className={authClasses.form} onSubmit={handleFormSubmit}>
              <Grid container spacing={2}>
                {userIsToRegister && (
                  <>
                    <InputFieldComponent
                      name='firstName'
                      label='First Name'
                      handleChange={handleInputChange}
                      autoFocus
                      required
                      half
                    />
                    <InputFieldComponent name='lastName' label='Last Name' handleChange={handleInputChange} half />
                  </>
                )}
                <InputFieldComponent
                  name='email'
                  label='Email'
                  type='email'
                  handleChange={handleInputChange}
                  autoFocus
                  required
                />
                <InputFieldComponent
                  name='password'
                  label='Password'
                  type={showPassword ? 'text' : 'password'}
                  handleChange={handleInputChange}
                  handleShowPassword={toggleShowPassword}
                  required
                />
                {userIsToRegister && (
                  <InputFieldComponent
                    name='confirmPassword'
                    label='Repeat Password'
                    handleChange={handleInputChange}
                    type='password'
                    required
                  />
                )}
              </Grid>
              <div className={authClasses.submit}>
                <Button type='submit' fullWidth variant='contained' color='primary'>
                  {userIsToRegister ? 'Register' : 'Login'}
                </Button>
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
