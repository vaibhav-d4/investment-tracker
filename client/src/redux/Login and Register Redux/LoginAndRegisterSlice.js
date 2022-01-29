import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userIsToRegister: false,
  userInitialData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  authData: null,
};

export const LoginAndRegisterSlice = createSlice({
  name: 'LoginAndRegisterSlice',
  initialState,
  reducers: {
    toggleUserIsToRegister: (state, action) => {
      state.userIsToRegister = action.payload;
    },
    formUserData: (state, action) => {
      state.userInitialData = action.payload;
    },
  },
});

export const { toggleUserIsToRegister, formUserData } =
  LoginAndRegisterSlice.actions;

export default LoginAndRegisterSlice.reducer;
