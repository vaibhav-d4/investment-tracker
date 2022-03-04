// SLICE IMPORTS
import { isDeleteDialogOpen, deleteDialogData, isDialogDeleteButtonLoading } from './StocksSlice';
import { getTableDataAction, enableCheckBoxSelectionAction, selectedStocksTransactionsAction } from './StocksActions';

// API IMPORTS
import * as api from '../../API/apis.js';

// OTHER IMPORTS
import * as toast from '../../Common/Utils/Toastify/ToastifyUtil';

///////////////////////// API ACTIONS /////////////////////////
export const deleteTransactionsAction = (request) => async (dispatch) => {
  const transactionIds = {
    deleteTransactionIds: request,
  };
  try {
    const { data } = await api.deleteTransactions(transactionIds);
    setTimeout(() => {
      dispatch(isDialogDeleteButtonLoading(false));
      dispatch(isDeleteDialogOpen(false));
      dispatch(enableCheckBoxSelectionAction(false));
      dispatch(getTableDataAction());
      toast.successToast(data?.message);
    }, 1000);
    dispatch(selectedStocksTransactionsAction([]));
  } catch (error) {
    toast.errorToast(error?.response?.data?.error);
    dispatch(isDialogDeleteButtonLoading(false));
    dispatch(isDeleteDialogOpen(false));
  }
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
