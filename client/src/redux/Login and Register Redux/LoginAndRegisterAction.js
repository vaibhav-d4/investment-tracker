import { toggleUserIsToRegister, formUserData, setAuthLocalStorageAfterAccess } from './LoginAndRegisterSlice';
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
    console.log('file: LoginAndRegisterAction.js ~ line 19 ~ login ~ error', error);
  }
};

// REGISTER ACTION
export const registerAction = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch(setAuthLocalStorageAfterAccess(data));
    navigate('/');
  } catch (error) {
    console.log('file: LoginAndRegisterAction.js ~ line 33 ~ registerAction ~ error', error);
  }
};

// GOOGLE LOGIN ACTION
export const googleLoginAction = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.googleLogin(userData.profileObj);
    dispatch(setAuthLocalStorageAfterAccess(data));
    navigate('/');
  } catch (error) {
    console.log('file: LoginAndRegisterAction.js ~ line 43 ~ googleLoginAction ~ error', error);
  }
};
