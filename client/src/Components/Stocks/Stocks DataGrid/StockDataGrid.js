// REACT IMPORTS
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// COMPONENTS IMPORTS
import DataGridNoRowsOverlayUtil from '../../../Common/Utils/MUI Utils/DataGridNoRowsOverlayUtil';
import DataGridColumns from './DataGridColumns';
import AddTransactionDialog from './Stocks Dialogs/AddDialog';
import DeleteDialog from './Stocks Dialogs/DeleteDialog';

// REDUX ACTIONS IMPORTS
import {
  isTableLoadingAction,
  getTableDataAction,
  isUpdateBtnLoadingAction,
  selectedStocksTransactionsAction,
  enableCheckBoxSelectionAction,
} from '../../../Redux/Stocks Redux/StocksActions';
import TransactionsStack from './DataGrid Stack/TransactionsStack';

const StockDataGrid = () => {
  const dispatch = useDispatch();

  const tableData = useSelector((state) => state.stocks.tableData);
  const isTableLoading = useSelector((state) => state.stocks.isTableLoading);
  const enableCheckBoxSelection = useSelector((state) => state.stocks.enableCheckBoxSelection);
  const selectedStocksTransactions = useSelector((state) => state.stocks.selectedStocksTransactions);

  useEffect(() => {
    dispatch(isTableLoadingAction(true));
    dispatch(getTableDataAction());
    dispatch(isUpdateBtnLoadingAction(false));
    dispatch(selectedStocksTransactionsAction([]));
    dispatch(enableCheckBoxSelectionAction(false));
  }, [dispatch]);

  const handleSelectedRowsChange = (selectedRows) => {
    dispatch(selectedStocksTransactionsAction(selectedRows));
  };

  return (
    <>
      <AddTransactionDialog />
      <DeleteDialog />
      <TransactionsStack />
      <div style={{ height: '70vh', width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={tableData}
              columns={DataGridColumns}
              autoPageSize={true}
              density='compact'
              loading={isTableLoading}
              checkboxSelection={enableCheckBoxSelection}
              onSelectionModelChange={handleSelectedRowsChange}
              selectionModel={selectedStocksTransactions}
              disableSelectionOnClick={true}
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
