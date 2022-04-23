// REACT IMPORTS
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// COMPONENT IMPORTS
import InputFieldComponent from '../../../../Common/Utils/Component Utils/InputFieldComponent';

// REDUX IMPORTS
import {
  isAddCategoryModalOpenAction,
  addAccountFormDataAction,
  setInitialAccountFormDataAction,
  addAccountFormDataSubmitAction,
  isAddCategoryModalSubmitBtnLoadingAction,
} from '../../../../Redux/Banks and Accounts Redux/AccountsActions';

const AddCategoryModal = () => {
  const dispatch = useDispatch();

  const [isDetailsCheckBoxChecked, setIsDetailsCheckBoxChecked] = useState(false);
  const isAddCategoryModalOpen = useSelector((state) => state.accounts.isAddCategoryModalOpen);
  const addAccountFormData = useSelector((state) => state.accounts.addAccountFormData);
  const isAddCategoryModalSubmitBtnLoading = useSelector((state) => state.accounts.isAddCategoryModalSubmitBtnLoading);

  const handleDetailsCheckboxChange = () => {
    setIsDetailsCheckBoxChecked(!isDetailsCheckBoxChecked);
  };

  const handleAddCategoryModalClose = () => {
    dispatch(isAddCategoryModalOpenAction(false));
    dispatch(setInitialAccountFormDataAction());
    setIsDetailsCheckBoxChecked(false);
    dispatch(isAddCategoryModalSubmitBtnLoadingAction(false));
  };

  const handleAddAccountFormDataChange = (e) => {
    dispatch(addAccountFormDataAction({ ...addAccountFormData, [e.target.name]: e.target.value }));
  };

  const handleAddAccountFormSubmit = (e) => {
    dispatch(isAddCategoryModalSubmitBtnLoadingAction(true));
    e.preventDefault();
    dispatch(addAccountFormDataSubmitAction(addAccountFormData));
  };

  return (
    <>
      <Dialog
        open={isAddCategoryModalOpen}
        onClose={handleAddCategoryModalClose}
        scroll='paper'
        fullWidth
        maxWidth='sm'
      >
        <DialogTitle>Add a new account</DialogTitle>
        <form autoComplete='off' onSubmit={handleAddAccountFormSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ mt: -3 }}>
                <div>
                  <FormControlLabel
                    control={<Checkbox checked={isDetailsCheckBoxChecked} onChange={handleDetailsCheckboxChange} />}
                    labelPlacement='start'
                    label='Enter complete details ?'
                  />
                </div>
              </Grid>
              <Grid item xs={12}>
                <InputFieldComponent
                  name='accountName'
                  label='Account Name'
                  type='text'
                  value={addAccountFormData.accountName}
                  handleChange={handleAddAccountFormDataChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <InputFieldComponent
                  name='initialBalance'
                  label='Initial Balance'
                  type='number'
                  value={addAccountFormData.initialBalance}
                  handleChange={handleAddAccountFormDataChange}
                  required
                  fullWidth
                />
              </Grid>
              {isDetailsCheckBoxChecked && (
                <>
                  <Grid item sm={6} xs={12}>
                    <InputFieldComponent
                      name='accountHolderName'
                      label='Account Holder Name'
                      type='text'
                      value={addAccountFormData.accountHolderName}
                      handleChange={handleAddAccountFormDataChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <InputFieldComponent
                      name='accountNumber'
                      label='Account Number'
                      type='number'
                      value={addAccountFormData.accountNumber}
                      handleChange={handleAddAccountFormDataChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <InputFieldComponent
                      name='IFSCCode'
                      label='IFSC Code'
                      type='text'
                      value={addAccountFormData.IFSCCode}
                      handleChange={handleAddAccountFormDataChange}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <InputFieldComponent
                      name='branchName'
                      label='Branch Name'
                      type='text'
                      value={addAccountFormData.branchName}
                      handleChange={handleAddAccountFormDataChange}
                      fullWidth
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant='text' color='primary' onClick={handleAddCategoryModalClose}>
              Cancel
            </Button>
            <LoadingButton loading={isAddCategoryModalSubmitBtnLoading} variant='text' color='success' type='submit'>
              Submit
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default AddCategoryModal;
