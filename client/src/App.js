// REACT IMPORTS
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { ThemeProvider, createTheme } from '@mui/material/styles';

// COMPONENTS AND STYLE IMPORTS
import useStyles from './AppStyles';
import Layout from './Common/Layout/Layout';
import PathRoutes from './Common/Routes/PathRoutes';

// REDUX IMPORTS
import { changeThemeAction } from './Redux/Theme and Layout Redux/ThemeAndLayoutAction';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.themeAndLayout.themeMode);

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const toggleColorMode = () => {
    dispatch(changeThemeAction(themeMode));
  };

  useEffect(() => {
    document.title = process.env.REACT_APP_APPLICATION_NAME;
  }, []);

  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout toggleColorMode={toggleColorMode} theme={theme} />
          <PathRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
