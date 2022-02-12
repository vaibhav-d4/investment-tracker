import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddTransactionDialogOpen: false,
};

export const StocksSlice = createSlice({
  name: 'StocksSlice',
  initialState,
  reducers: {
    isAddTransactionDialogOpen: (state, action) => {
      state.isAddTransactionDialogOpen = action.payload;
    },
  },
});

export const { isAddTransactionDialogOpen } = StocksSlice.actions;

export default StocksSlice.reducer;
