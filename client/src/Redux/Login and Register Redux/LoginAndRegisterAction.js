import {
  toggleUserIsToRegister,
  formUserData,
  setAuthLocalStorageAfterAccess,
  userLogout,
  formHasError,
  formErrorData,
  loadingForButton,
  isSessionExpired,
  isLogoutBtnClicked,
} from './LoginAndRegisterSlice';
import * as api from '../../API/apis.js';

// Initial user data when page loads or reopens
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

///////////////////////// COMMON ACTIONS ///////////////////////////////////////
export const toggleUserIsToRegisterAction = (request) => async (dispatch) => {
  dispatch(toggleUserIsToRegister(request));
};

export const formUserDataAction = (request) => async (dispatch) => {
  dispatch(formUserData(request));
};

export const formHasErrorAction = (request) => async (dispatch) => {
  dispatch(formHasError(request));
};

export const initialFormDataAction = () => async (dispatch) => {
  dispatch(formUserData(initialFormData));
};

export const loadingForButtonAction = (request) => async (dispatch) => {
  dispatch(loadingForButton(request));
};

export const isSessionExpiredAction = (request) => async (dispatch) => {
  dispatch(isSessionExpired(request));
};

export const isLogoutBtnClickedAction = (request) => async (dispatch) => {
  dispatch(isLogoutBtnClicked(request));
};

///////////////////////// API ACTIONS /////////////////////////////////
// LOGIN ACTION
export const loginAction = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.login(formData);
    dispatch(setAuthLocalStorageAfterAccess(data));
    navigate('/');
  } catch (error) {
    dispatch(formHasError(true));
    dispatch(loadingForButton(false));
    dispatch(
      formErrorData(
        error && error.response && error.response.data
          ? error.response.data
          : { message: 'Unexpected response. Please try again.' }
      )
    );
  }
};

// REGISTER ACTION
export const registerAction = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);
    dispatch(setAuthLocalStorageAfterAccess(data));
    navigate('/');
  } catch (error) {
    dispatch(formHasError(true));
    dispatch(loadingForButton(false));
    dispatch(
      formErrorData(
        error && error.response && error.response.data
          ? error.response.data
          : { message: 'Unexpected response. Please try again.' }
      )
    );
  }
};

// GOOGLE LOGIN ACTION
export const googleLoginAction = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.googleLogin(userData.profileObj);
    dispatch(setAuthLocalStorageAfterAccess(data));
    navigate('/');
  } catch (error) {
    dispatch(formHasError(true));
    dispatch(
      formErrorData(
        error && error.response && error.response.data
          ? error.response.data
          : { message: 'Unexpected response. Please try again.' }
      )
    );
  }
};

// LOGOUT ACTION
export const logoutAction = () => async (dispatch) => {
  dispatch(userLogout());
};
