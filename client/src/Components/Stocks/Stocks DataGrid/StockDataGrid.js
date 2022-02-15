// REACT IMPORTS
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// COMPONENTS IMPORTS
import DataGridNoRowsOverlayUtil from '../../../Common/Utils/MUI Utils/DataGridNoRowsOverlayUtil';
import DataGridColumns from './DataGridColumns';
import AddTransactionDialog from './Add Transaction Dialog/AddTransactionDialog';

// REDUX ACTIONS IMPORTS
import {
  isDialogOpenAction,
  initialDataAction,
  isYahooURLErrorAction,
} from '../../../Redux/Stocks Redux/AddTransactionActions';
import {
  isTableLoadingAction,
  getTableDataAction,
  updateTableAction,
  isUpdateBtnLoadingAction,
} from '../../../Redux/Stocks Redux/StocksActions';

// OTHER IMPORTS
// import * as toast from '../../../Common/Utils/Toastify/ToastifyUtil';

const StockDataGrid = () => {
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.stocks.tableData);
  const isTableLoading = useSelector((state) => state.stocks.isTableLoading);
  const isUpdateBtnLoading = useSelector((state) => state.stocks.isUpdateBtnLoading);

  useEffect(() => {
    dispatch(isTableLoadingAction(true));
    dispatch(getTableDataAction());
    dispatch(isUpdateBtnLoadingAction(false));
  }, [dispatch]);

  const handleTableUpdate = () => {
    dispatch(isTableLoadingAction(true));
    dispatch(updateTableAction());
  };

  const handleAddTransactionDialogOpen = () => {
    dispatch(isDialogOpenAction(true));
    dispatch(isYahooURLErrorAction(false));
    dispatch(initialDataAction());
  };

  return (
    <>
      <AddTransactionDialog />
      <Stack sx={{ mt: -2, mb: 1 }} direction='row' alignItems='flex-start' justifyContent='flex-end' spacing={2}>
        <LoadingButton
          size='small'
          variant='contained'
          loading={isUpdateBtnLoading}
          disabled={tableData.length > 0 ? false : true}
          onClick={handleTableUpdate}
        >
          Update
        </LoadingButton>
        <Button size='small' variant='contained' onClick={handleAddTransactionDialogOpen}>
          Add Transaction
        </Button>
      </Stack>
      <div style={{ height: '70vh', width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={tableData}
              columns={DataGridColumns}
              autoPageSize
              density='compact'
              loading={isTableLoading}
              components={{
                Toolbar: GridToolbar,
                NoRowsOverlay: DataGridNoRowsOverlayUtil,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StockDataGrid;
