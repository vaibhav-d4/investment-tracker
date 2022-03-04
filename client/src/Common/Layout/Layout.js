// REACT IMPORTS
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { isJwtExpired } from 'jwt-check-expiration';

// MUI IMPORTS
import { useTheme } from '@mui/material/styles';
import {
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Tooltip,
} from '@mui/material';

// MUI ICONS
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

// REDUX IMPORTS
import { toggleDrawerAction } from '../../Redux/Theme and Layout Redux/ThemeAndLayoutAction';
import {
  toggleUserIsToRegisterAction,
  logoutAction,
  formHasErrorAction,
  initialFormDataAction,
  isSessionExpiredAction,
  isLogoutBtnClickedAction,
} from '../../Redux/Login and Register Redux/LoginAndRegisterAction';

// COMPONENTS IMPORTS
import useStyles from './LayoutStyles';
import { AppBar, Drawer, DrawerHeader, StyledBadge } from '../Utils/MUI Utils/LayoutUtils';
import sideBarItemsList from './SideBarItems';

const Layout = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDrawerOpen = useSelector((state) => state.themeAndLayout.isDrawerOpen);
  const userLoggedIn = useSelector((state) => state.loginAndRegister.userLoggedIn);
  const currentUserData = useSelector((state) => state.loginAndRegister.userData);

  useEffect(() => {
    const userJWTToken = currentUserData?.jwtToken;
    if (userJWTToken) {
      const isTokenExpired = isJwtExpired(userJWTToken);
      if (isTokenExpired) {
        dispatch(logoutAction());
        dispatch(isSessionExpiredAction(true));
        navigate('/logout');
      }
    }
  });

  const handleToggleDrawer = () => {
    dispatch(toggleDrawerAction());
  };

  const handleLoginClick = () => {
    navigate('/login');
    dispatch(toggleUserIsToRegisterAction(false));
    dispatch(formHasErrorAction(false));
    dispatch(isSessionExpiredAction(false));
    dispatch(initialFormDataAction());
  };

  const handleLogoutClick = () => {
    navigate('/logout');
    dispatch(logoutAction());
    dispatch(isLogoutBtnClickedAction(true));
  };

  return (
    <>
      <Box className={classes.layoutContainer}>
        <CssBaseline />
        <AppBar position='fixed' open={isDrawerOpen}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleToggleDrawer}
              edge='start'
              sx={{
                marginRight: '36px',
                ...(isDrawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              type='link'
              onClick={() => {
                userLoggedIn ? navigate('/home') : navigate('/login');
              }}
              variant='h5'
              noWrap
              component='div'
              className={classes.headerLinkText}
            >
              {process.env.REACT_APP_APPLICATION_NAME}
            </Typography>
            <Box sx={{ flexGrow: '1' }} />
            {userLoggedIn && currentUserData && (
              <>
                <StyledBadge
                  overlap='circular'
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant='dot'
                >
                  <Avatar alt={currentUserData.userInfo.userName} src={currentUserData.userInfo.userImageUrl}>
                    {currentUserData.userInfo.userName.charAt(0)}
                  </Avatar>
                </StyledBadge>
                <div className={classes.userNameInAppBar}>
                  <Typography variant='subtitle1'>{currentUserData.userInfo.userName}</Typography>
                </div>
              </>
            )}
            <Tooltip title='Change Theme' arrow>
              <IconButton onClick={props.toggleColorMode} color='inherit'>
                {props.theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            {!userLoggedIn ? (
              <Tooltip title='Login' arrow>
                <IconButton onClick={handleLoginClick} color='inherit'>
                  <LoginIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title='Log out' arrow>
                <IconButton onClick={handleLogoutClick} color='inherit'>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={isDrawerOpen}>
          <DrawerHeader>
            <IconButton onClick={handleToggleDrawer}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {userLoggedIn ? (
            sideBarItemsList.map((item) => {
              const { text, icon, linkText } = item;
              return (
                <ListItem button key={text} onClick={() => navigate(linkText)}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              );
            })
          ) : (
            <ListItem button key={sideBarItemsList[0].text} onClick={() => navigate(sideBarItemsList[0].linkText)}>
              {sideBarItemsList[0].icon && <ListItemIcon>{sideBarItemsList[0].icon}</ListItemIcon>}
              <ListItemText primary={sideBarItemsList[0].text} />
            </ListItem>
          )}
        </Drawer>
      </Box>
    </>
  );
};

export default Layout;
