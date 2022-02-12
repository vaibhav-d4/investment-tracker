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
export const isAddTransactionDialogOpenAction = (request) => async (dispatch) => {
  dispatch(isAddTransactionDialogOpen(request));
};

export const addTransactionFormDataAction = (request) => async (dispatch) => {
  dispatch(addTransactionFormData(request));
};

export const addTransactionInitialDataAction = () => async (dispatch) => {
  dispatch(addTransactionFormData(addTransactionInitialData));
};

export const isAddTransactionSubmitLoadingAction = (request) => async (dispatch) => {
  dispatch(isAddTransactionSubmitLoading(request));
};

///////////////////////// API ACTIONS /////////////////////////
export const addTransactionAction = (request) => async (dispatch) => {
  console.log('file: StocksActions.js ~ line 33 ~ addTransactionAction ~ request', request);
};
