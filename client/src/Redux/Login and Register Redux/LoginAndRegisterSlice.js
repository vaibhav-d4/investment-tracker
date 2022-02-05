import { createSlice } from '@reduxjs/toolkit';

const checkUserisActive = () => {
  const user = localStorage.getItem('user');
  if (user) return true;
  else return false;
};

const getCurrentUserDetails = () => {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  else return {};
};

const initialState = {
  userIsToRegister: false,
  userInitialData: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  userData: getCurrentUserDetails(),
  userLoggedIn: checkUserisActive(),
  formHasError: false,
  formErrorData: {},
  loadingForButton: false,
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
      const data = action.payload;
      const setLocalStorageData = {
        userId: data.userData._id,
        name: data.userData.name,
        email: data.userData.email,
        imageUrl: data.userData.imageUrl,
      };
      localStorage.setItem('user', JSON.stringify(setLocalStorageData));
      state.userData = getCurrentUserDetails();
      state.userLoggedIn = true;
    },
    userLogout: (state, action) => {
      localStorage.clear();
      state.userLoggedIn = false;
    },
    formHasError: (state, action) => {
      state.formHasError = action.payload;
    },
    formErrorData: (state, action) => {
      state.formErrorData = action.payload;
    },
    loadingForButton: (state, action) => {
      state.loadingForButton = action.payload;
    },
  },
});

export const {
  toggleUserIsToRegister,
  formUserData,
  setAuthLocalStorageAfterAccess,
  userLogout,
  formHasError,
  formErrorData,
  loadingForButton,
} = LoginAndRegisterSlice.actions;

export default LoginAndRegisterSlice.reducer;
