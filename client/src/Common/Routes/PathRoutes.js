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

  const checkLoggedIn = (Component) => {
    if (userLoggedIn) return <Component />;
    else return <Navigate to='/unauthorized' />;
  };

  /////////////////// DEFAULT LOGIN PATH ROUTE ///////////////////
  const defaultLoginRoute = [
    {
      exact: true,
      path: '/',
      element: <Navigate to='/login' />,
    },
  ];

  /////////////////// AUTH ROUTES ///////////////////
  const authRoutes = [
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
  ];

  ///////////////////////////////////// COMPONENTS ROUTES /////////////////////////////////////

  /////////////////// NOT FOUND ///////////////////
  const notFoundRoute = [
    {
      exact: false,
      path: '*',
      element: <PageNotFoundComponent />,
    },
  ];

  /////////////////// HOME COMPONENT ROUTES ///////////////////
  const homeRoute = [
    {
      exact: true,
      path: '/home',
      element: checkLoggedIn(HomeComponent),
    },
  ];

  /////////////////// BANK COMPONENT ROUTES ///////////////////
  const banksAndAccountsRoutes = [
    {
      exact: true,
      path: '/banks',
      element: checkLoggedIn(BankComponent),
    },
    {
      exact: true,
      path: '/banks/accounts',
      element: checkLoggedIn(BankComponent),
    },
    {
      exact: true,
      path: '/banks/transactions',
      element: checkLoggedIn(BankComponent),
    },
    {
      exact: true,
      path: '/banks/monthlyReport',
      element: checkLoggedIn(BankComponent),
    },
    {
      exact: true,
      path: '/banks/yearlyReport',
      element: checkLoggedIn(BankComponent),
    },
  ];

  /////////////////// STOCKS COMPONENT ROUTES ///////////////////
  const stocksRoutes = [
    {
      exact: true,
      path: '/stocks',
      element: checkLoggedIn(StocksComponent),
    },
    {
      exact: true,
      path: '/stocks/overview',
      element: checkLoggedIn(StocksComponent),
    },
    {
      exact: true,
      path: '/stocks/transactions',
      element: checkLoggedIn(StocksComponent),
    },
  ];

  /////////////////// MUTUAL FUND COMPONENT ROUTES ///////////////////
  const mutualFundRoutes = [
    {
      exact: true,
      path: '/mutualfunds',
      element: checkLoggedIn(MutualFundsComponent),
    },
  ];

  /////////////////// FIXED DEPOSIT COMPONENT ROUTES ///////////////////
  const fdRoutes = [
    {
      exact: true,
      path: '/fd',
      element: checkLoggedIn(FixedDepositComponent),
    },
  ];

  /////////////////// GOLD COMPONENT ROUTES ///////////////////
  const goldRoutes = [
    {
      exact: true,
      path: '/gold',
      element: checkLoggedIn(GoldComponent),
    },
  ];

  const routesList = [
    ...defaultLoginRoute,
    ...authRoutes,
    ...homeRoute,
    ...banksAndAccountsRoutes,
    ...stocksRoutes,
    ...mutualFundRoutes,
    ...fdRoutes,
    ...goldRoutes,
    ...notFoundRoute,
  ];

  return (
    <>
      <RoutesComponent routesList={routesList} />
    </>
  );
};

export default PathRoutes;
