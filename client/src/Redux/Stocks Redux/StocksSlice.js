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
  //////////////////// STOCKS DATAGRID INITIAL STATES ////////////////////
  isTableLoading: false,
  tableData: [],
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
    //////////////////// DATAGRID REDUCERS ////////////////////
    isTableLoading: (state, action) => {
      state.isTableLoading = action.payload;
    },
    tableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
});

export const {
  isAddTransactionDialogOpen,
  addTransactionFormData,
  isAddTransactionSubmitLoading,
  isYahooURLError,
  isTableLoading,
  tableData,
} = StocksSlice.actions;

export default StocksSlice.reducer;
