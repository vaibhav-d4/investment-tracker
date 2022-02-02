import axios from 'axios';

const URL = process.env.REACT_APP_DEV_URL;
// const URL = process.env.REACT_APP_PROD_URL;

const API = axios.create({
  baseURL: URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

// LOGIN AND REGISTER API
export const login = (formData) => API.post('/user/login', formData);
export const register = (formData) => API.post('/user/register', formData);
export const googleLogin = (userData) => API.post('/user/googlelogin', userData);
