import axios from 'axios';

const URL = process.env.REACT_APP_DEV_URL;
// const URL = process.env.REACT_APP_PROD_URL;

const API = axios.create({
  baseURL: URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('user')) {
    const jwtToken = JSON.parse(localStorage.getItem('user')).jwtToken;
    req.headers.authorization = `Bearer ${jwtToken}`;
  }
  return req;
});

// LOGIN AND REGISTER APIS
export const login = (formData) => API.post('/user/login', formData);
export const register = (formData) => API.post('/user/register', formData);
export const googleLogin = (userData) => API.post('/user/googlelogin', userData);

// STOCKS APIS
export const getTransactions = () => API.get('/stocks/getTransactions');
export const updateTransactions = () => API.get('/stocks/updateTransactions');
export const addTransaction = (formData) => API.post('/stocks/addTransaction', formData);
export const deleteTransactions = (deleteTransactionIds) =>
  API.delete('/stocks/deleteTransactions', { data: deleteTransactionIds });
