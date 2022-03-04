// REACT IMPORTS
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TableContainer,
  Table,
  TableHead,
  Paper,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// REDUX ACTIONS IMPORTS
import {
  isDeleteDialogOpenAction,
  isDialogDeleteButtonLoadingAction,
  deleteTransactionsAction,
} from '../../../../Redux/Stocks Redux/DeleteTransactionActions';

const DeleteDialog = () => {
  const dispatch = useDispatch();

  const isDeleteDialogOpen = useSelector((state) => state.stocks.isDeleteDialogOpen);
  const deleteDialogData = useSelector((state) => state.stocks.deleteDialogData);
  const isDialogDeleteButtonLoading = useSelector((state) => state.stocks.isDialogDeleteButtonLoading);
  const selectedStocksTransactions = useSelector((state) => state.stocks.selectedStocksTransactions);

  const handleCloseDeleteDialog = () => {
    dispatch(isDeleteDialogOpenAction(false));
  };

  const handleDeleteSubmit = () => {
    dispatch(isDialogDeleteButtonLoadingAction(true));
    dispatch(deleteTransactionsAction(selectedStocksTransactions));
  };

  return (
    <>
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog} scroll='paper' fullWidth maxWidth='sm'>
        <DialogTitle>Are you sure to delete the following transactions?</DialogTitle>
        <DialogContent>
          <Paper elevation={0}>
            <TableContainer>
              <Table size='small' stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Stock</TableCell>
                    <TableCell align='center'>Shares</TableCell>
                    <TableCell align='center'>Buy Date</TableCell>
                    <TableCell align='center'>Invested Amt</TableCell>
                    <TableCell align='center'>Current Amt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deleteDialogData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align='center'>{row.companyName}</TableCell>
                      <TableCell align='center'>{row.noOfShares}</TableCell>
                      <TableCell align='center'>{row.buyDate}</TableCell>
                      <TableCell align='center'>{row.totalInvestedAmount}</TableCell>
                      <TableCell align='center'>{row.totalCurrentAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button variant='text' color='primary' onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <LoadingButton
            loading={isDialogDeleteButtonLoading}
            variant='text'
            color='error'
            type='submit'
            onClick={handleDeleteSubmit}
          >
            DELETE
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteDialog;
