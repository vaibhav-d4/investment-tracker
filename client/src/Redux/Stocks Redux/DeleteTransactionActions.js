// SLICE IMPORTS
import { isDeleteDialogOpen, deleteDialogData } from './StocksSlice';

// API IMPORTS
// import * as api from '../../API/apis.js';

// OTHER IMPORTS
// import * as toast from '../../Common/Utils/Toastify/ToastifyUtil';

///////////////////////// COMMON ACTIONS /////////////////////////
export const isDeleteDialogOpenAction = (request) => async (dispatch) => {
  dispatch(isDeleteDialogOpen(request));
};

export const deleteDialogDataAction = (request) => async (dispatch) => {
  dispatch(deleteDialogData(request));
};
