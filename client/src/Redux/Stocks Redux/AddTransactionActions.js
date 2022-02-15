// SLICE IMPORTS
import {
  isAddTransactionDialogOpen,
  addTransactionFormData,
  isAddTransactionSubmitLoading,
  isYahooURLError,
} from './StocksSlice';

// API IMPORTS
import * as api from '../../API/apis.js';

// OTHER IMPORTS
import * as toast from '../../Common/Utils/Toastify/ToastifyUtil';

// Initial Add Transaction Dialog Data
const addTransactionInitialData = {
  depositoryName: '',
  // companyName: '',
  // googleSymbol: '',
  // yahooSymbol: '',
  yahooSymbolURL: '',
  buyDate: null,
  noOfShares: '',
  priceOfShareAtBuy: '',
};

///////////////////////// COMMON ACTIONS /////////////////////////
export const isDialogOpenAction = (request) => async (dispatch) => {
  dispatch(isAddTransactionDialogOpen(request));
};

export const formDataAction = (request) => async (dispatch) => {
  dispatch(addTransactionFormData(request));
};

export const initialDataAction = () => async (dispatch) => {
  dispatch(addTransactionFormData(addTransactionInitialData));
};

export const isSubmitLoadingAction = (request) => async (dispatch) => {
  dispatch(isAddTransactionSubmitLoading(request));
};

export const isYahooURLErrorAction = (request) => async (dispatch) => {
  dispatch(isYahooURLError(request));
};

const startsWith = (str, word) => {
  return str.lastIndexOf(word, 0) === 0;
};

///////////////////////// API ACTIONS /////////////////////////
export const formSubmitAction = (formData) => async (dispatch) => {
  console.log('file: AddTransactionActions.js ~ line 54 ~ formSubmitAction ~ formData', formData);
  dispatch(isAddTransactionSubmitLoading(true));

  const isYahooError = startsWith(formData.yahooSymbolURL, 'https://finance.yahoo.com/quote');

  try {
    if (!isYahooError) {
      dispatch(isYahooURLError(true));
      dispatch(isAddTransactionSubmitLoading(false));
    } else {
      dispatch(isYahooURLError(false));
      const { data } = await api.addTransaction(formData);
      setTimeout(() => {
        toast.successToast(data?.message);
        dispatch(isAddTransactionDialogOpen(false));
        dispatch(isAddTransactionSubmitLoading(false));
      }, 2000);
    }
  } catch (error) {
    toast.errorToast(error?.response?.data?.error || 'Unexpected Error.');
    dispatch(addTransactionFormData(addTransactionInitialData));
    dispatch(isAddTransactionSubmitLoading(false));
  }
};
