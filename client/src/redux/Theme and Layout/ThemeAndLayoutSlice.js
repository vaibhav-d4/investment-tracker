import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  themeMode: 'dark',
  isDrawerOpen: false,
};

export const ThemeAndLayoutSlice = createSlice({
  name: 'ThemeAndLayoutSlice',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.themeMode = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const { changeTheme, toggleDrawer } = ThemeAndLayoutSlice.actions;

export default ThemeAndLayoutSlice.reducer;
