// BASIC IMPORTS
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: 'bottom-right',
  autoClose: 3000,
  closeOnClick: true,
  closeButton: true,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  theme: 'colored',
});

export const defaultToast = (message, delay) => {
  toast(message, { delay: delay || 0 });
};

export const infoToast = (message, delay) => {
  toast.info(message, { delay: delay || 0 });
};

export const successToast = (message, delay) => {
  toast.success(message, { delay: delay || 0 });
};

export const warnToast = (message, delay) => {
  toast.warn(message, { delay: delay || 0 });
};

export const errorToast = (message, delay) => {
  toast.error(message, { delay: delay || 0 });
};
