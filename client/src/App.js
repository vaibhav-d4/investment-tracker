// REACT IMPORTS
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { ThemeProvider, createTheme } from '@mui/material/styles';

// COMPONENTS AND STYLE IMPORTS
import useStyles from './AppStyles';
import Layout from './Common/Layout/Layout';
import HomeComponent from './Components/Home/HomeComponent';
import BankComponent from './Components/Banks and Accounts/BanksAndAccountsComponent';
import StocksComponent from './Components/Stocks/StocksComponent';
import MFComponent from './Components/Mutual Funds/MutualFundsComponent';
import FDComponent from './Components/Fixed Deposits/FixedDepositComponent';
import GoldComponent from './Components/Gold/GoldComponent';
import LoginAndRegisterComponent from './Common/Login and Register/LoginAndRegisterComponent';
import UnauthorizedComponent from './Common/Common Pages/UnauthorizedComponent';
import PageNotFoundComponent from './Common/Common Pages/PageNotFoundComponent';

// REDUX IMPORTS
import { changeThemeAction } from './Redux/Theme and Layout Redux/ThemeAndLayoutAction';

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.themeAndLayout.themeMode);

  const userLoggedIn = useSelector((state) => state.loginAndRegister.userLoggedIn);

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
          <Routes>
            {/* <Route exact path='/'>
              {loggedIn ? <Redirect to='/dashboard' /> : <PublicHomePage />}
            </Route> */}
            {/* DEFAULT HOME PATH ROUTE */}
            <Route exact path='/' element={<Navigate to='/home' />} />
            {/* AUTH ROUTES */}
            <Route exact path='/login' element={<LoginAndRegisterComponent />} />
            <Route exact path='/register' element={<LoginAndRegisterComponent />} />
            <Route exact path='/unauthorized' element={<UnauthorizedComponent />} />
            {/* COMPONENTS ROUTE */}
            {/* <Route exact path='/home' element={<HomeComponent />} /> */}
            <Route exact path='/home' element={userLoggedIn ? <HomeComponent /> : <Navigate to='/unauthorized' />} />
            <Route exact path='/banks' element={userLoggedIn ? <BankComponent /> : <Navigate to='/unauthorized' />} />
            <Route
              exact
              path='/stocks'
              element={userLoggedIn ? <StocksComponent /> : <Navigate to='/unauthorized' />}
            />
            <Route
              exact
              path='/mutualfunds'
              element={userLoggedIn ? <MFComponent /> : <Navigate to='/unauthorized' />}
            />
            <Route exact path='/fd' element={userLoggedIn ? <FDComponent /> : <Navigate to='/unauthorized' />} />
            <Route exact path='/gold' element={userLoggedIn ? <GoldComponent /> : <Navigate to='/unauthorized' />} />
            {/* PAGE NOT FOUND */}
            <Route path='*' element={<PageNotFoundComponent />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
