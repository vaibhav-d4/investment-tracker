// SLICE IMPORTS
import { isAddTransactionDialogOpen, addTransactionFormData, isAddTransactionSubmitLoading } from './StocksSlice';

// API IMPORTS
import * as api from '../../API/apis.js';

// Initial Add Transaction Dialog Data
const addTransactionInitialData = {
  depositoryName: '',
  companyName: '',
  googleSymbol: '',
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
  console.log('file: AddTransactionActions.js ~ line 37 ~ formSubmitAction ~ formData', formData);
  const { data } = await api.addTransaction(formData);
  console.log('data', data);
};
