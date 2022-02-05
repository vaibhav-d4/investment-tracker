// REACT IMPORTS
import React from 'react';

// MUI IMPORTS
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';

// COMPONENTS IMPORTS

const StockDataGrid = () => {
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
    { id: 4, col1: 'Hello', col2: 'World' },
    { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 6, col1: 'MUI', col2: 'is Amazing' },
    { id: 7, col1: 'Hello', col2: 'World' },
    { id: 8, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 9, col1: 'MUI', col2: 'is Amazing' },
    { id: 10, col1: 'Hello', col2: 'World' },
    { id: 11, col1: 'Hello', col2: 'World' },
    { id: 12, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 13, col1: 'MUI', col2: 'is Amazing' },
    { id: 14, col1: 'Hello', col2: 'World' },
    { id: 15, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 16, col1: 'MUI', col2: 'is Amazing' },
    { id: 17, col1: 'Hello', col2: 'World' },
    { id: 18, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 19, col1: 'MUI', col2: 'is Amazing' },
    { id: 20, col1: 'Hello', col2: 'World' },
  ];

  const columns = [
    { field: 'col1', headerName: 'Column 1', width: 150 },
    { field: 'col2', headerName: 'Column 2', width: 150 },
  ];
  return (
    <>
      <Stack sx={{ mt: -1, mb: 1 }} direction='row' alignItems='flex-start' justifyContent='flex-end' spacing={2}>
        <Button size='small' variant='contained' onClick={() => {}}>
          Add Transaction
        </Button>
      </Stack>
      <div style={{ height: '500px', width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              autoPageSize
              density='compact'
              loading={false}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default StockDataGrid;
