// REACT IMPORTS
import React from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

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
} from '@mui/material';

// MUI ICONS
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

// COMPONENTS IMPORTS
import useStyles from './LayoutStyles';
import { AppBar, Drawer, DrawerHeader, StyledBadge } from '../Utils/LayoutUtils';
import sideBarItemsList from './SideBarItems';

// REDUX IMPORTS
import { toggleDrawerAction } from '../../Redux/Theme and Layout Redux/ThemeAndLayoutAction';
import {
  toggleUserIsToRegisterAction,
  logoutAction,
} from '../../Redux/Login and Register Redux/LoginAndRegisterAction';

const Layout = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isDrawerOpen = useSelector((state) => state.themeAndLayout.isDrawerOpen);
  const userLoggedIn = useSelector((state) => state.loginAndRegister.userLoggedIn);
  const currentUserData = useSelector((state) => state.loginAndRegister.userData);

  const handleToggleDrawer = () => {
    dispatch(toggleDrawerAction());
  };

  const handleLoginClick = () => {
    navigate('/login');
    dispatch(toggleUserIsToRegisterAction(false));
  };

  const handleLogoutClick = () => {
    navigate('/login');
    dispatch(logoutAction());
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
              onClick={() => navigate('/home')}
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
                  <Avatar alt={currentUserData.name} src={currentUserData.imageUrl}>
                    {currentUserData.name.charAt(0)}
                  </Avatar>
                </StyledBadge>
                <div className={classes.userNameInAppBar}>
                  <Typography variant='subtitle1'>{currentUserData.name}</Typography>
                </div>
              </>
            )}
            <IconButton onClick={props.toggleColorMode} color='inherit'>
              {props.theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            {!userLoggedIn ? (
              <IconButton onClick={handleLoginClick} color='inherit'>
                <LoginIcon />
              </IconButton>
            ) : (
              <IconButton onClick={handleLogoutClick} color='inherit'>
                <LogoutIcon />
              </IconButton>
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
