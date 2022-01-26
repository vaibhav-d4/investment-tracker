// REACT IMPORTS
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { ThemeProvider, createTheme } from '@mui/material/styles';

// COMPONENTS AND STYLE IMPORTS
import useStyles from './AppStyles';
import Layout from './Components/Layout/Layout';
import HomeComponent from './Components/Home/HomeComponent';
import BankComponent from './Components/Banks and Accounts/BanksAndAccountsComponent';
import StocksComponent from './Components/Stocks/StocksComponent';
import MFComponent from './Components/Mutual Funds/MutualFundsComponent';
import FDComponent from './Components/Fixed Deposits/FixedDepositComponent';
import GoldComponent from './Components/Gold/GoldComponent';

// REDUX IMPORTS
import { changeThemeAction } from './redux/Theme and Layout/ThemeAndLayoutAction';

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

  return (
    <div className={classes.container}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Layout toggleColorMode={toggleColorMode} theme={theme} />
          <Routes>
            {/* <Route exact path='/'>
              {loggedIn ? <Redirect to='/dashboard' /> : <PublicHomePage />}
            </Route> */}
            <Route exact path='/' element={<Navigate to='/home' />} />{' '}
            {/* TEMP */}
            <Route exact path='/home' element={<HomeComponent />} />
            <Route exact path='/banks' element={<BankComponent />} />
            <Route exact path='/stocks' element={<StocksComponent />} />
            <Route exact path='/mutualfunds' element={<MFComponent />} />
            <Route exact path='/fd' element={<FDComponent />} />
            <Route exact path='/gold' element={<GoldComponent />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
