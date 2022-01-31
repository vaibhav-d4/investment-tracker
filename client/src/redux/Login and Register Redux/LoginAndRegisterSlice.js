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
    setAuthLocalStorageAfterAccess: (state, action) => {
      state.authData = action.payload;
      const setLocalStorageData = {
        id: state.authData.userData._id,
        name: state.authData.userData.name,
        email: state.authData.userData.email,
      };
      localStorage.setItem('user', JSON.stringify(setLocalStorageData));
    },
  },
});

export const {
  toggleUserIsToRegister,
  formUserData,
  setAuthLocalStorageAfterAccess,
} = LoginAndRegisterSlice.actions;

export default LoginAndRegisterSlice.reducer;
