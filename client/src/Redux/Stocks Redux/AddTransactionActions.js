// SLICE IMPORTS
import { isAddTransactionDialogOpen, addTransactionFormData, isAddTransactionSubmitLoading } from './StocksSlice';

// API IMPORTS
import * as api from '../../API/apis.js';

// OTHER IMPORTS
import * as toast from '../../Common/Utils/Toastify/ToastifyUtil';

// Initial Add Transaction Dialog Data
const addTransactionInitialData = {
  depositoryName: '',
  companyName: '',
  // googleSymbol: '',
  yahooSymbol: '',
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

///////////////////////// API ACTIONS /////////////////////////
export const formSubmitAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addTransaction(formData);
    setTimeout(function () {
      toast.successToast(data?.message);
      dispatch(isAddTransactionDialogOpen(false));
      dispatch(isAddTransactionSubmitLoading(false));
    }, 2000);
  } catch (error) {
    toast.errorToast(error?.response?.data?.error);
    dispatch(addTransactionFormData(addTransactionInitialData));
    dispatch(isAddTransactionSubmitLoading(false));
  }
};
