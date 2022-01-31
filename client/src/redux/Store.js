import { configureStore } from '@reduxjs/toolkit';
import ThemeAndLayoutReducer from './Theme and Layout Redux/ThemeAndLayoutSlice';
import LoginAndRegisterReducer from './Login and Register Redux/LoginAndRegisterSlice';

export default configureStore({
  reducer: {
    themeAndLayout: ThemeAndLayoutReducer,
    loginAndRegister: LoginAndRegisterReducer,
  },
});
