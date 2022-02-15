// REACT IMPORTS
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// COMPONENT IMPORTS
import RoutesComponent from './RoutesComponent';
import LoginAndRegisterComponent from '../Login, Register and Logout/LoginAndRegisterComponent';
import LogoutComponent from '../Login, Register and Logout/LogoutComponent';
import UnauthorizedComponent from '../Common Pages/UnauthorizedComponent';
import PageNotFoundComponent from '../Common Pages/PageNotFoundComponent';
import HomeComponent from '../../Components/Home/HomeComponent';
import BankComponent from '../../Components/Banks and Accounts/BanksAndAccountsComponent';
import StocksComponent from '../../Components/Stocks/StocksComponent';
import MutualFundsComponent from '../../Components/Mutual Funds/MutualFundsComponent';
import FixedDepositComponent from '../../Components/Fixed Deposits/FixedDepositComponent';
import GoldComponent from '../../Components/Gold/GoldComponent';

const PathRoutes = () => {
  const userLoggedIn = useSelector((state) => state.loginAndRegister.userLoggedIn);
  const isLogoutBtnClicked = useSelector((state) => state.loginAndRegister.isLogoutBtnClicked);
  const isSessionExpired = useSelector((state) => state.loginAndRegister.isSessionExpired);

  const routesList = [
    /////////////////// DEFAULT LOGIN PATH ROUTE ///////////////////
    {
      exact: true,
      path: '/',
      element: <Navigate to='/login' />,
    },

    /////////////////// AUTH ROUTES ///////////////////
    {
      exact: true,
      path: '/login',
      element: userLoggedIn ? <Navigate to='/home' /> : <LoginAndRegisterComponent />,
    },
    {
      exact: true,
      path: '/register',
      element: <LoginAndRegisterComponent />,
    },
    {
      exact: true,
      path: '/logout',
      element: userLoggedIn ? (
        <Navigate to='/home' />
      ) : isLogoutBtnClicked || isSessionExpired ? (
        <LogoutComponent />
      ) : (
        <Navigate to='/login' />
      ),
    },
    {
      exact: true,
      path: '/unauthorized',
      element: userLoggedIn ? <Navigate to='/home' /> : <UnauthorizedComponent />,
    },

    /////////////////// COMPONENTS ROUTES ///////////////////
    {
      exact: true,
      path: '/home',
      element: userLoggedIn ? <HomeComponent /> : <Navigate to='/unauthorized' />,
    },
    {
      exact: true,
      path: '/banks',
      element: userLoggedIn ? <BankComponent /> : <Navigate to='/unauthorized' />,
    },
    {
      exact: true,
      path: '/stocks',
      element: userLoggedIn ? <StocksComponent /> : <Navigate to='/unauthorized' />,
    },
    {
      exact: true,
      path: '/mutualfunds',
      element: userLoggedIn ? <MutualFundsComponent /> : <Navigate to='/unauthorized' />,
    },
    {
      exact: true,
      path: '/fd',
      element: userLoggedIn ? <FixedDepositComponent /> : <Navigate to='/unauthorized' />,
    },
    {
      exact: true,
      path: '/gold',
      element: userLoggedIn ? <GoldComponent /> : <Navigate to='/unauthorized' />,
    },
    /////////////////// NOT FOUND ///////////////////
    {
      exact: false,
      path: '*',
      element: <PageNotFoundComponent />,
    },
  ];

  return (
    <>
      <RoutesComponent routesList={routesList} />
    </>
  );
};

export default PathRoutes;
