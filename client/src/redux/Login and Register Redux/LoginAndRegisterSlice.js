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
  userData: null,
  userLoggedIn: false,
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
      state.userData = action.payload;
      const setLocalStorageData = {
        id: state.userData.userData._id,
        name: state.userData.userData.name,
        email: state.userData.userData.email,
      };
      state.userLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(setLocalStorageData));
    },
    userLogout: (state, action) => {
      localStorage.clear();
      state.userLoggedIn = false;
    },
  },
});

export const { toggleUserIsToRegister, formUserData, setAuthLocalStorageAfterAccess, userLogout } =
  LoginAndRegisterSlice.actions;

export default LoginAndRegisterSlice.reducer;
