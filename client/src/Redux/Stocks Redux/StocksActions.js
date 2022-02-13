// SLICE IMPORTS
import { isTableLoading, tableData } from './StocksSlice';

// API IMPORTS
import * as api from '../../API/apis.js';

// OTHER IMPORTS
// import * as toast from '../../Common/Utils/Toastify/ToastifyUtil';

///////////////////////// COMMON ACTIONS /////////////////////////
export const isTableLoadingAction = (request) => async (dispatch) => {
  dispatch(isTableLoading(request));
};

///////////////////////// API ACTIONS /////////////////////////
export const getTableDataAction = () => async (dispatch) => {
  try {
    const { data } = await api.getTransactions();

    // dispatch(tableData(data?.transactionDetails));
    const createdTableData = await createTableData(data?.transactionDetails);
    dispatch(tableData(createdTableData));
    dispatch(isTableLoading(false));
  } catch (error) {
    console.log(error);
  }
};

///////////////////////// COMMON FUNCTIONS /////////////////////////
export const createTableData = async (data) => {
  const dataObject = data.map(({ _id: id, ...rest }) => ({
    id,
    ...rest,
  }));
  return dataObject;
};
