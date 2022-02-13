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
  isSessionExpired: false,
  isLogoutBtnClicked: false,
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
      const receivedData = action.payload;
      const setLocalStorageData = {
        userInfo: {
          userId: receivedData.userData._id,
          userName: receivedData.userData.name,
          userEmail: receivedData.userData.email,
          userImageUrl: receivedData.userData.imageUrl,
        },
        jwtToken: receivedData.jwtToken,
      };
      localStorage.setItem('user', JSON.stringify(setLocalStorageData));
      state.userData = getCurrentUserDetails();
      state.userLoggedIn = true;
    },
    userLogout: (state) => {
      localStorage.clear();
      state.userData = {};
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
    isSessionExpired: (state, action) => {
      state.isSessionExpired = action.payload;
    },
    isLogoutBtnClicked: (state, action) => {
      state.isLogoutBtnClicked = action.payload;
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
  isSessionExpired,
  isLogoutBtnClicked,
} = LoginAndRegisterSlice.actions;

export default LoginAndRegisterSlice.reducer;
