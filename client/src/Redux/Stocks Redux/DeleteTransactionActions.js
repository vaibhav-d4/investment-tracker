// SLICE IMPORTS
import { isDeleteDialogOpen, deleteDialogData, isDialogDeleteButtonLoading } from './StocksSlice';

// API IMPORTS
// import * as api from '../../API/apis.js';

// OTHER IMPORTS
// import * as toast from '../../Common/Utils/Toastify/ToastifyUtil';

///////////////////////// API ACTIONS /////////////////////////
export const deleteTransactionsAction = (request) => async (dispatch) => {
  console.log('file: DeleteTransactionActions.js ~ line 12 ~ deleteTransactionsAction ~ request', request);
};

///////////////////////// COMMON ACTIONS /////////////////////////
export const isDeleteDialogOpenAction = (request) => async (dispatch) => {
  dispatch(isDeleteDialogOpen(request));
};

export const deleteDialogDataAction = (request) => async (dispatch) => {
  dispatch(deleteDialogData(request));
};

export const isDialogDeleteButtonLoadingAction = (request) => async (dispatch) => {
  dispatch(isDialogDeleteButtonLoading(request));
};
