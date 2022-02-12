import { configureStore } from '@reduxjs/toolkit';
import ThemeAndLayoutReducer from './Theme and Layout Redux/ThemeAndLayoutSlice';
import LoginAndRegisterReducer from './Login and Register Redux/LoginAndRegisterSlice';
import StocksSliceReducer from './Stocks Redux/StocksSlice';

export default configureStore({
  reducer: {
    themeAndLayout: ThemeAndLayoutReducer,
    loginAndRegister: LoginAndRegisterReducer,
    stocks: StocksSliceReducer,
  },
});
