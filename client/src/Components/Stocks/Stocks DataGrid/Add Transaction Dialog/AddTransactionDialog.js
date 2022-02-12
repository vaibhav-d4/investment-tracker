// REACT IMPORTS
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

// COMPONENTS IMPORTS
// import useDialogStyles from '../../../../Common/Utils/Styles/DialogStyles';
import InputFieldComponent from '../../../../Common/Utils/Component Utils/InputFieldComponent';

// REDUX ACTIONS IMPORTS
import {
  isDialogOpenAction,
  formDataAction,
  initialDataAction,
  isSubmitLoadingAction,
  formSubmitAction,
} from '../../../../Redux/Stocks Redux/AddTransactionActions';

const AddTransactionDialog = () => {
  // const dialogClasses = useDialogStyles();
  const dispatch = useDispatch();

  const todayDate = new Date();

  const isAddTransactionDialogOpen = useSelector((state) => state.stocks.isAddTransactionDialogOpen);
  const addTransactionFormData = useSelector((state) => state.stocks.addTransactionFormData);
  const isAddTransactionSubmitLoading = useSelector((state) => state.stocks.isAddTransactionSubmitLoading);

  const handleDialogClose = () => {
    dispatch(initialDataAction());
    dispatch(isDialogOpenAction(false));
    dispatch(isSubmitLoadingAction(false));
  };

  const handleInputDataChange = (e) => {
    dispatch(formDataAction({ ...addTransactionFormData, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (newDateValue) => {
    dispatch(formDataAction({ ...addTransactionFormData, buyDate: JSON.stringify(newDateValue) }));
  };

  // MAIN ADD TRANSACTION FORM SUBMIT
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(isSubmitLoadingAction(true));
    dispatch(formSubmitAction(addTransactionFormData));
  };

  return (
    <>
      <Dialog open={isAddTransactionDialogOpen} onClose={handleDialogClose} scroll='paper' fullWidth maxWidth='sm'>
        <DialogTitle>Add a New Transaction</DialogTitle>
        <form autoComplete='off' onSubmit={handleFormSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <InputFieldComponent
                name='depositoryName'
                label='Depository Name'
                type='text'
                value={addTransactionFormData.depositoryName}
                handleChange={handleInputDataChange}
                required
                fullWidth
              />
              <InputFieldComponent
                name='companyName'
                label='Company Name'
                type='text'
                value={addTransactionFormData.companyName}
                handleChange={handleInputDataChange}
                required
                fullWidth
              />
              <InputFieldComponent
                name='googleSymbol'
                label='Google Symbol'
                type='text'
                value={addTransactionFormData.googleSymbol}
                handleChange={handleInputDataChange}
                required
                half
              />
              <InputFieldComponent
                name='yahooSymbol'
                label='Yahoo Symbol'
                type='text'
                value={addTransactionFormData.yahooSymbol}
                handleChange={handleInputDataChange}
                required
                half
              />
              <Grid item xs={12} sm={3} /> {/* EMPTY GRID ITEM */}
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DatePicker
                    label='Buy Date'
                    inputFormat='dd/MM/yyyy'
                    maxDate={todayDate}
                    value={JSON.parse(addTransactionFormData.buyDate)}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField required fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3} /> {/* EMPTY GRID ITEM */}
              <InputFieldComponent
                name='noOfShares'
                label='Number of Shares'
                type='number'
                value={addTransactionFormData.noOfShares}
                handleChange={handleInputDataChange}
                required
                half
              />
              <InputFieldComponent
                name='priceOfShareAtBuy'
                label='Price of Share when Bought'
                type='number'
                value={addTransactionFormData.priceOfShareAtBuy}
                handleChange={handleInputDataChange}
                required
                half
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant='text' color='primary' onClick={handleDialogClose}>
              Cancel
            </Button>
            <LoadingButton loading={isAddTransactionSubmitLoading} variant='text' color='primary' type='submit'>
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddTransactionDialog;
