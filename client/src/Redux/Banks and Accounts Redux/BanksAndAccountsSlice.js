import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ///////////////////////// ACCOUNTS COMPONENT INITIAL STATES /////////////////////////
  accountsInfoData: [],
  isAccountsTableLoading: false,
  addAccountFormData: {
    accountName: '',
    initialBalance: '',
    accountHolderName: '',
    accountNumber: '',
    IFSCCode: '',
    branchName: '',
  },
  isAddCategoryModalOpen: false,
  isAddCategoryModalSubmitBtnLoading: false,
};

export const BanksAndAccountsSlice = createSlice({
  name: 'BanksAndAccountsSlice',
  initialState,
  reducers: {
    accountsInfoData: (state, action) => {
      state.accountsInfoData = action.payload;
    },
    isAccountsTableLoading: (state, action) => {
      state.isAccountsTableLoading = action.payload;
    },
    addAccountFormData: (state, action) => {
      state.addAccountFormData = action.payload;
    },
    isAddCategoryModalOpen: (state, action) => {
      state.isAddCategoryModalOpen = action.payload;
    },
    isAddCategoryModalSubmitBtnLoading: (state, action) => {
      state.isAddCategoryModalSubmitBtnLoading = action.payload;
    },
  },
});

export const {
  accountsInfoData,
  isAccountsTableLoading,
  isAddCategoryModalOpen,
  addAccountFormData,
  isAddCategoryModalSubmitBtnLoading,
} = BanksAndAccountsSlice.actions;

export default BanksAndAccountsSlice.reducer;
