// REACT IMPORTS
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { Stack, Divider, Tooltip, Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// COMPONENT IMPORTS
import DataGridNoRowsOverlayUtil from '../../../Common/Utils/MUI Utils/DataGridNoRowsOverlayUtil';
import AddCategoryModal from './Modals/AddCategoryModal';

// REDUX IMPORTS
import { isAddCategoryModalOpenAction } from '../../../Redux/Banks and Accounts Redux/AccountsActions';

const CategoriesComp = () => {
  const dispatch = useDispatch();

  const [isAddCategoryTooltipOpen, setIsAddCategoryTooltipOpen] = useState(false);

  const handleAddCategoryModalButton = () => {
    dispatch(isAddCategoryModalOpenAction(true));
  };

  return (
    <>
      <AddCategoryModal />
      <Stack
        sx={{ mb: 2 }}
        direction='row'
        alignItems='flex-start'
        justifyContent='flex-end'
        spacing={2}
        divider={<Divider orientation='vertical' flexItem />}
      >
        <Tooltip
          title='Add a new Category'
          open={isAddCategoryTooltipOpen}
          onOpen={() => setIsAddCategoryTooltipOpen(true)}
          onClose={() => setIsAddCategoryTooltipOpen(false)}
          arrow
        >
          <span>
            <Button disabled={false} size='small' variant='contained' onClick={handleAddCategoryModalButton}>
              Add Account
            </Button>
          </span>
        </Tooltip>
      </Stack>
      <div style={{ height: '50vh', width: '100%' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={[]}
              columns={CategoriesColumns}
              autoPageSize={true}
              density='compact'
              loading={false}
              // checkboxSelection={}
              // onSelectionModelChange={}
              // selectionModel={}
              // disableSelectionOnClick={true}
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

export default CategoriesComp;

const CategoriesColumns = [
  // {
  //   field: 'id',
  //   headerName: 'Account ID',
  //   headerAlign: 'center',
  //   description: 'Unique Account ID',
  //   align: 'center',
  //   width: 210,
  //   hide: true,
  // },
  // {
  //   field: 'userId',
  //   headerName: 'User ID',
  //   headerAlign: 'center',
  //   description: 'User ID',
  //   align: 'center',
  //   width: 210,
  //   hide: true,
  // },
  {
    field: 'userName',
    headerName: 'Name',
    headerAlign: 'center',
    description: 'User Name',
    align: 'center',
    width: 200,
    hide: true,
  },
  {
    field: 'userEmail',
    headerName: 'Email',
    headerAlign: 'center',
    description: 'User Email',
    align: 'center',
    width: 200,
    hide: true,
  },
  {
    field: 'accountName',
    headerName: 'Account Name',
    headerAlign: 'center',
    description: 'Account Name',
    align: 'center',
    flex: 1,
    minWidth: 200,
    hide: false,
  },
  {
    field: 'currentBalance',
    headerName: 'Balance',
    headerAlign: 'center',
    description: 'Current Balance',
    align: 'center',
    width: 200,
    hide: false,
  },
];
