// SLICE IMPORTS
import {
  accountsInfoData,
  isAccountsTableLoading,
  isAddCategoryModalOpen,
  addAccountFormData,
  isAddCategoryModalSubmitBtnLoading,
} from './BanksAndAccountsSlice';

// API IMPORTS
import * as api from '../../API/apis.js';

// OTHER IMPORTS
import * as toast from '../../Common/Utils/Toastify/ToastifyUtil';

// ADD ACCOUNT OF CATEGORY INITIAL DATA
const addCategoryInitialData = {
  accountName: '',
  initialBalance: '',
  accountHolderName: '',
  accountNumber: '',
  IFSCCode: '',
  branchName: '',
};

/////////////////////////////////////// API ACTIONS ///////////////////////////////////////
// GET ACCOUNTS AND CATEGORIES INFO
export const getAccountsInfoAction = () => async (dispatch) => {
  dispatch(isAccountsTableLoadingAction(true));
  try {
    const { data } = await api.getAccountsInfo();
    const accountData = await createAccountData(data?.accountsInfo);
    dispatch(accountsInfoData(accountData));
    setTimeout(() => {
      toast.successToast(data?.message);
      dispatch(isAccountsTableLoadingAction(false));
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

// ADD A ACCOUNT OR CATEGORY
export const addAccountFormDataSubmitAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addAccountCategory(formData);
    setTimeout(() => {
      toast.successToast(data?.message);
      dispatch(isAddCategoryModalSubmitBtnLoadingAction(false));
      dispatch(isAddCategoryModalOpenAction(false));
      dispatch(setInitialAccountFormDataAction());
      dispatch(getAccountsInfoAction());
    }, 1000);
  } catch (error) {
    toast.errorToast(error?.response?.data?.error || 'Unexpected Error.');
    dispatch(setInitialAccountFormDataAction());
    dispatch(isAddCategoryModalSubmitBtnLoadingAction(false));
  }
};

/////////////////////////////////////// COMMON ACTIONS ///////////////////////////////////////
export const isAddCategoryModalOpenAction = (request) => async (dispatch) => {
  dispatch(isAddCategoryModalOpen(request));
};

export const addAccountFormDataAction = (request) => async (dispatch) => {
  dispatch(addAccountFormData(request));
};

export const setInitialAccountFormDataAction = () => async (dispatch) => {
  dispatch(addAccountFormData(addCategoryInitialData));
};

export const isAddCategoryModalSubmitBtnLoadingAction = (request) => async (dispatch) => {
  dispatch(isAddCategoryModalSubmitBtnLoading(request));
};

export const isAccountsTableLoadingAction = (request) => async (dispatch) => {
  dispatch(isAccountsTableLoading(request));
};

export const createAccountData = async (data) => {
  const dataObject = data.map(({ _id: id, ...rest }) => ({
    id,
    ...rest,
  }));
  return dataObject;
};
