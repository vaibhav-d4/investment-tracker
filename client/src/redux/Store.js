import { configureStore } from '@reduxjs/toolkit';
import ThemeAndLayoutReducer from './Theme and Layout//ThemeAndLayoutSlice';

export default configureStore({
  reducer: {
    themeAndLayout: ThemeAndLayoutReducer,
  },
});
