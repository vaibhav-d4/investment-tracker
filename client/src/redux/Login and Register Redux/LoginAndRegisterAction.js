import {
  toggleUserIsToRegister,
  formUserData,
  setAuthLocalStorageAfterAccess,
  userLogout,
} from './LoginAndRegisterSlice';
import * as api from '../../API/apis.js';

// COMMON ACTIONS
export const toggleUserIsToRegisterAction = (request) => async (dispatch) => {
  dispatch(toggleUserIsToRegister(request));
};

export const formUserDataAction = (request) => async (dispatch) => {
  dispatch(formUserData(request));
};

// API ACTIONS

// LOGIN ACTION
export const loginAction = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch(setAuthLocalStorageAfterAccess(data));
    navigate('/');
  } catch (error) {
    console.log('loginAction ~ error', error);
  }
};

// REGISTER ACTION
export const registerAction = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch(setAuthLocalStorageAfterAccess(data));
    navigate('/');
  } catch (error) {
    console.log('registerAction ~ error', error);
  }
};

// GOOGLE LOGIN ACTION
export const googleLoginAction = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.googleLogin(userData.profileObj);
    dispatch(setAuthLocalStorageAfterAccess(data));
    navigate('/');
  } catch (error) {
    console.log('googleLoginAction ~ error', error);
  }
};

// LOGOUT ACTION
export const logoutAction = () => async (dispatch) => {
  dispatch(userLogout());
};
