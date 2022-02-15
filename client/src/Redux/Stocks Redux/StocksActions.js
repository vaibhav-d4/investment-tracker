// SLICE IMPORTS
import { isTableLoading, tableData } from './StocksSlice';

// API IMPORTS
import * as api from '../../API/apis.js';

// OTHER IMPORTS
import * as toast from '../../Common/Utils/Toastify/ToastifyUtil';

///////////////////////// API ACTIONS /////////////////////////
export const getTableDataAction = () => async (dispatch) => {
  try {
    const { data } = await api.getTransactions();

    const createdTableData = await createTableData(data?.transactionDetails);
    dispatch(tableData(createdTableData));
    dispatch(isTableLoading(false));
  } catch (error) {
    toast.errorToast(error?.response?.data?.error);
  }
};

export const updateTableAction = () => async (dispatch) => {
  try {
    const { data } = await api.updateTransactions();
    console.log('file: StocksActions.js ~ line 25 ~ updateTableAction ~ data', data);
  } catch (error) {
    toast.errorToast(error?.response?.data?.error);
    dispatch(isTableLoading(false));
  }
};

///////////////////////// COMMON ACTIONS /////////////////////////
export const isTableLoadingAction = (request) => async (dispatch) => {
  dispatch(isTableLoading(request));
};

///////////////////////// COMMON FUNCTIONS /////////////////////////
export const createTableData = async (data) => {
  const dataObject = data.map(({ _id: id, ...rest }) => ({
    id,
    ...rest,
  }));
  return dataObject;
};
