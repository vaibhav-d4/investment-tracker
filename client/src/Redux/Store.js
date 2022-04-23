import { configureStore } from '@reduxjs/toolkit';
import ThemeAndLayoutReducer from './Theme and Layout Redux/ThemeAndLayoutSlice';
import LoginAndRegisterReducer from './Login and Register Redux/LoginAndRegisterSlice';
import StocksSliceReducer from './Stocks Redux/StocksSlice';
import BanksAndAccountsReducer from './Banks and Accounts Redux/BanksAndAccountsSlice';

export default configureStore({
  reducer: {
    themeAndLayout: ThemeAndLayoutReducer,
    loginAndRegister: LoginAndRegisterReducer,
    stocks: StocksSliceReducer,
    accounts: BanksAndAccountsReducer,
  },
});
