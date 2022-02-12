// REACT IMPORTS
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// COMPONENTS IMPORTS
import InputFieldComponent from '../../../../Common/Utils/Component Utils/InputFieldComponent';

// REDUX ACTIONS IMPORTS
import { isAddTransactionDialogOpenAction } from '../../../../Redux/Stocks Redux/StocksActions';

const AddTransactionDialog = () => {
  const dispatch = useDispatch();

  const isAddTransactionDialogOpen = useSelector((state) => state.stocks.isAddTransactionDialogOpen);

  const handleDialogClose = () => {
    dispatch(isAddTransactionDialogOpenAction(false));
  };

  const handleInputDataChange = () => {};
  return (
    <>
      <Dialog open={isAddTransactionDialogOpen} onClose={handleDialogClose} scroll='paper' fullWidth maxWidth='sm'>
        <DialogTitle>Add a New Transaction</DialogTitle>
        <DialogContent>
          <InputFieldComponent
            name='depositoryName'
            label='Depository Name'
            handleChange={handleInputDataChange}
            required
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant='text' color='primary' onClick={handleDialogClose}>
            Cancel
          </Button>
          <LoadingButton loading={false} variant='text' color='primary'>
            Submit
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTransactionDialog;
