import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //////////////////// ADD TRANSACTION INITIAL STATES ////////////////////
  isAddTransactionDialogOpen: false,
  addTransactionFormData: {
    depositoryName: '',
    // companyName: '',
    // googleSymbol: '',
    // yahooSymbol: '',
    yahooSymbolURL: '',
    buyDate: null,
    noOfShares: '',
    priceOfShareAtBuy: '',
  },
  isAddTransactionSubmitLoading: false,
  isYahooURLError: false,
  //////////////////// DELETE TRANSACTION INITIAL STATES ////////////////////
  isDeleteDialogOpen: false,
  deleteDialogData: [],
  isDialogDeleteButtonLoading: false,
  //////////////////// STOCKS DATAGRID INITIAL STATES ////////////////////
  isTableLoading: false,
  tableData: [],
  isUpdateBtnLoading: false,
  enableCheckBoxSelection: false,
  selectedStocksTransactions: [],
};

export const StocksSlice = createSlice({
  name: 'StocksSlice',
  initialState,
  reducers: {
    //////////////////// ADD TRANSACTIONS REDUCERS ////////////////////
    isAddTransactionDialogOpen: (state, action) => {
      state.isAddTransactionDialogOpen = action.payload;
    },
    addTransactionFormData: (state, action) => {
      state.addTransactionFormData = action.payload;
    },
    isAddTransactionSubmitLoading: (state, action) => {
      state.isAddTransactionSubmitLoading = action.payload;
    },
    isYahooURLError: (state, action) => {
      state.isYahooURLError = action.payload;
    },
    //////////////////// DELETE TRANSACTIONS REDUCERS ////////////////////
    isDeleteDialogOpen: (state, action) => {
      state.isDeleteDialogOpen = action.payload;
    },
    deleteDialogData: (state, action) => {
      state.deleteDialogData = action.payload;
    },
    isDialogDeleteButtonLoading: (state, action) => {
      state.isDialogDeleteButtonLoading = action.payload;
    },
    //////////////////// STOCKS DATAGRID REDUCERS ////////////////////
    isTableLoading: (state, action) => {
      state.isTableLoading = action.payload;
    },
    tableData: (state, action) => {
      state.tableData = action.payload;
    },
    isUpdateBtnLoading: (state, action) => {
      state.isUpdateBtnLoading = action.payload;
    },
    enableCheckBoxSelection: (state, action) => {
      state.enableCheckBoxSelection = action.payload;
    },
    selectedStocksTransactions: (state, action) => {
      state.selectedStocksTransactions = action.payload;
    },
  },
});

export const {
  isAddTransactionDialogOpen,
  addTransactionFormData,
  isAddTransactionSubmitLoading,
  isYahooURLError,
  isDeleteDialogOpen,
  deleteDialogData,
  isDialogDeleteButtonLoading,
  isTableLoading,
  tableData,
  isUpdateBtnLoading,
  enableCheckBoxSelection,
  selectedStocksTransactions,
} = StocksSlice.actions;

export default StocksSlice.reducer;
