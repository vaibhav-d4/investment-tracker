// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';

// COMPONENTS IMPORTS
import DataGridNoRowsOverlayUtil from '../../../Common/Utils/DataGridNoRowsOverlayUtil';
import DataGridColumns from './DataGridColumns';

const StockDataGrid = () => {
  const rows = [];

  return (
    <>
      <Stack sx={{ mt: -2, mb: 1 }} direction='row' alignItems='flex-start' justifyContent='flex-end' spacing={2}>
        <Button size='small' variant='contained' onClick={() => {}}>
          Update
        </Button>
        <Button size='small' variant='contained' onClick={() => {}}>
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
