// SLICE IMPORTS
import {
  accountsInfoData,
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
export const getAccountsInfoAction = (request) => async (dispatch) => {};

// ADD A ACCOUNT OR CATEGORY
export const addAccountFormDataSubmitAction = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addAccountCategory(formData);
    setTimeout(() => {
      toast.successToast(data?.message);
      dispatch(isAddCategoryModalSubmitBtnLoadingAction(false));
      dispatch(isAddCategoryModalOpenAction(false));
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
