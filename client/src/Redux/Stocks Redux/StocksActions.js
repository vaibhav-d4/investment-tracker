import { isAddTransactionDialogOpen } from './StocksSlice';

///////////////////////// COMMON ACTIONS ///////////////////////////////////////
export const isAddTransactionDialogOpenAction = (request) => async (dispatch) => {
  dispatch(isAddTransactionDialogOpen(request));
};
