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
} from '@mui/material';

// MUI ICONS
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// COMPONENTS IMPORTS
import useStyles from './LayoutStyles';
import { AppBar, Drawer, DrawerHeader } from '../Utils/LayoutUtils';
import sideBarItemsList from './SideBarItems';

// REDUX IMPORTS
import { toggleDrawerAction } from '../../redux/Theme and Layout/ThemeAndLayoutAction';

const Layout = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDrawerOpen = useSelector(
    (state) => state.themeAndLayout.isDrawerOpen
  );

  const handleToggleDrawer = () => {
    dispatch(toggleDrawerAction());
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
              variant='h6'
              noWrap
              component='div'
              className={classes.headerLinkText}
            >
              {process.env.REACT_APP_APPLICATION_NAME}
            </Typography>
            <Box sx={{ flexGrow: '1' }} />
            <IconButton onClick={props.toggleColorMode} color='inherit'>
              {props.theme.palette.mode === 'dark' ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={isDrawerOpen}>
          <DrawerHeader>
            <IconButton onClick={handleToggleDrawer}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {sideBarItemsList.map((item) => {
            const { text, icon, linkText } = item;
            return (
              <ListItem button key={text} onClick={() => navigate(linkText)}>
                {icon && <ListItemIcon>{icon}</ListItemIcon>}
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </Drawer>
      </Box>
    </>
  );
};

export default Layout;
