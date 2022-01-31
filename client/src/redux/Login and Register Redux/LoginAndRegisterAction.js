import { toggleUserIsToRegister, formUserData } from './LoginAndRegisterSlice';
import * as api from '../../API/apis.js';

// COMMON ACTIONS
export const toggleUserIsToRegisterAction = (request) => async (dispatch) => {
  dispatch(toggleUserIsToRegister(request));
};

export const formUserDataAction = (request) => async (dispatch) => {
  dispatch(formUserData(request));
};

// API ACTIONS
export const loginAction = (formData, navigate) => async (dispatch) => {
  try {
    navigate('/');
  } catch (error) {
    console.log(
      'file: LoginAndRegisterAction.js ~ line 19 ~ login ~ error',
      error
    );
  }
};
