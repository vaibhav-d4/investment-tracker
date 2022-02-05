import { changeTheme, toggleDrawer } from './ThemeAndLayoutSlice';

export const changeThemeAction = (request) => async (dispatch) => {
  const themeMode = request === 'dark' ? 'light' : 'dark';
  dispatch(changeTheme(themeMode));
};

export const toggleDrawerAction = () => async (dispatch) => {
  dispatch(toggleDrawer());
};
