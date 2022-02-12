// REACT IMPORTS
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, Box, TextField } from '@mui/material';
import {
  LoadingButton,
  // AdapterDateFns, LocalizationProvider, DatePicker
} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// COMPONENTS IMPORTS
import useDialogStyles from '../../../../Common/Utils/Styles/DialogStyles';
import InputFieldComponent from '../../../../Common/Utils/Component Utils/InputFieldComponent';

// REDUX ACTIONS IMPORTS
import { isAddTransactionDialogOpenAction } from '../../../../Redux/Stocks Redux/StocksActions';

const AddTransactionDialog = () => {
  const dialogClasses = useDialogStyles();
  const dispatch = useDispatch();

  const isAddTransactionDialogOpen = useSelector((state) => state.stocks.isAddTransactionDialogOpen);

  const handleDialogClose = () => {
    dispatch(isAddTransactionDialogOpenAction(false));
  };

  const handleInputDataChange = (e) => {
    console.log(e.target.value);
  };

  const handleDateChange = (newDateValue) => {
    console.log(newDateValue);
  };

  return (
    <>
      <Dialog open={isAddTransactionDialogOpen} onClose={handleDialogClose} scroll='paper' fullWidth maxWidth='sm'>
        <DialogTitle>Add a New Transaction</DialogTitle>
        <DialogContent>
          <Box component='form' autoComplete='off' className={dialogClasses.inputFields}>
            <Grid container spacing={2}>
              <InputFieldComponent
                name='depositoryName'
                label='Depository Name'
                handleChange={handleInputDataChange}
                required
                fullWidth
              />
              <InputFieldComponent
                name='companyName'
                label='Company Name'
                handleChange={handleInputDataChange}
                required
                fullWidth
              />
              <InputFieldComponent
                name='googleSymbol'
                label='Google Symbol'
                handleChange={handleInputDataChange}
                required
                half
              />
              <InputFieldComponent
                name='yahooSymbol'
                label='Yahoo Symbol'
                handleChange={handleInputDataChange}
                required
                half
              />
              <Grid item xs={12} sm={3} /> {/* EMPTY GRID ITEM */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DatePicker
                    label='Buy Date'
                    // value={}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField required fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3} /> {/* EMPTY GRID ITEM */}
              <InputFieldComponent
                name='noOfShares'
                label='Number of Shares'
                handleChange={handleInputDataChange}
                required
                half
              />
              <InputFieldComponent
                name='priceOfShareAtBuy'
                label='Price of Share when Bought'
                handleChange={handleInputDataChange}
                required
                half
              />
            </Grid>
          </Box>
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
