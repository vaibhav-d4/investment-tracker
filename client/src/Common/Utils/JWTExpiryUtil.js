// REACT IMPORTS
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isJwtExpired } from 'jwt-check-expiration';
import { useNavigate } from 'react-router';

// REDUX IMPORTS
import { logoutAction } from '../../Redux/Login and Register Redux/LoginAndRegisterAction';

const JWTExpiryUtil = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUserData = useSelector((state) => state.loginAndRegister.userData);

  const userJWTToken = currentUserData?.jwtToken;

  if (userJWTToken) {
    const isExpired = isJwtExpired(userJWTToken);
    if (isExpired) {
      dispatch(logoutAction());
      navigate('/login');
    } else {
    }
  }
  return <></>;
};

export default JWTExpiryUtil;
