// REACT IMPORTS
import React from 'react';
import { useDispatch } from 'react-redux';

// MUI IMPORTS
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';

// COMPONENTS IMPORTS
import DataGridNoRowsOverlayUtil from '../../../Common/Utils/MUI Utils/DataGridNoRowsOverlayUtil';
import DataGridColumns from './DataGridColumns';
import AddTransactionDialog from './Add Transaction Dialog/AddTransactionDialog';

// REDUX ACTIONS IMPORTS
import { isDialogOpenAction, initialDataAction } from '../../../Redux/Stocks Redux/AddTransactionActions';

const StockDataGrid = () => {
  const dispatch = useDispatch();

  const rows = [];

  const handleAddTransactionDialogOpen = () => {
    dispatch(isDialogOpenAction(true));
    dispatch(initialDataAction());
  };

  return (
    <>
      <AddTransactionDialog />
      <Stack sx={{ mt: -2, mb: 1 }} direction='row' alignItems='flex-start' justifyContent='flex-end' spacing={2}>
        <Button size='small' variant='contained' onClick={() => {}}>
          Update
        </Button>
        <Button size='small' variant='contained' onClick={handleAddTransactionDialogOpen}>
          Add Transaction
        </Button>
      </Stack>
      <div style={{ height: '70vh', width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={DataGridColumns}
              autoPageSize
              density='compact'
              loading={false}
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
