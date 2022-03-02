// REACT IMPORTS
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// MUI IMPORTS
import { Button, Stack, Tooltip, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// REDUC ACTIONS IMPORTS
import {
  isDialogOpenAction,
  initialDataAction,
  isYahooURLErrorAction,
} from '../../../../Redux/Stocks Redux/AddTransactionActions';
import {
  isDeleteDialogOpenAction,
  deleteDialogDataAction,
} from '../../../../Redux/Stocks Redux/DeleteTransactionActions';
import {
  isTableLoadingAction,
  updateTableAction,
  enableCheckBoxSelectionAction,
  selectedStocksTransactionsAction,
} from '../../../../Redux/Stocks Redux/StocksActions';

const TransactionsStack = () => {
  const dispatch = useDispatch();

  const [isAddButtonTooltipOpen, setIsAddButtonTooltipOpen] = React.useState(false);

  const tableData = useSelector((state) => state.stocks.tableData);
  const isUpdateBtnLoading = useSelector((state) => state.stocks.isUpdateBtnLoading);
  const isAddTransactionDialogOpen = useSelector((state) => state.stocks.isAddTransactionDialogOpen);
  const enableCheckBoxSelection = useSelector((state) => state.stocks.enableCheckBoxSelection);
  const selectedStocksTransactions = useSelector((state) => state.stocks.selectedStocksTransactions);

  const handleTableUpdate = () => {
    dispatch(isTableLoadingAction(true));
    dispatch(updateTableAction());
  };

  const handleAddTransactionDialogOpen = () => {
    setIsAddButtonTooltipOpen(false);
    dispatch(isDialogOpenAction(true));
    dispatch(isYahooURLErrorAction(false));
    dispatch(initialDataAction());
  };

  const handleEnableDelete = () => {
    dispatch(enableCheckBoxSelectionAction(true));
  };

  const fetchDeleteDialogData = () => {
    const filteredDeleteDialogData = tableData.filter((item) => selectedStocksTransactions.includes(item.id));
    dispatch(deleteDialogDataAction(filteredDeleteDialogData));
  };

  const handleDeleteTransactions = () => {
    dispatch(isDeleteDialogOpenAction(true));
    fetchDeleteDialogData();
  };

  const handleDeleteCancel = () => {
    dispatch(enableCheckBoxSelectionAction(false));
    dispatch(selectedStocksTransactionsAction([]));
  };

  return (
    <>
      <Stack
        sx={{ mt: -2, mb: 1 }}
        direction='row'
        alignItems='flex-start'
        justifyContent='flex-end'
        spacing={2}
        divider={<Divider orientation='vertical' flexItem />}
      >
        <Tooltip
          title='Add a new transaction'
          open={isAddButtonTooltipOpen}
          onOpen={() => setIsAddButtonTooltipOpen(true)}
          onClose={() => setIsAddButtonTooltipOpen(false)}
          arrow
        >
          <span>
            <Button
              disabled={isAddTransactionDialogOpen}
              size='small'
              variant='contained'
              onClick={handleAddTransactionDialogOpen}
            >
              Add
            </Button>
          </span>
        </Tooltip>
        {!enableCheckBoxSelection ? (
          <Tooltip title='Delete transactions' arrow>
            <span>
              <Button size='small' variant='contained' onClick={handleEnableDelete}>
                Delete
              </Button>
            </span>
          </Tooltip>
        ) : (
          <>
            <Tooltip title='Select transactions to Delete' arrow>
              <span>
                <LoadingButton
                  size='small'
                  variant='contained'
                  loading={false}
                  disabled={!selectedStocksTransactions.length > 0 ? true : false}
                  onClick={handleDeleteTransactions}
                >
                  Delete
                </LoadingButton>
              </span>
            </Tooltip>
            <Tooltip title='Disable delete' arrow>
              <Button size='small' variant='contained' onClick={handleDeleteCancel} color='error'>
                Cancel
              </Button>
            </Tooltip>
          </>
        )}
        <Tooltip title='Update all transactions' arrow>
          <span>
            <LoadingButton
              size='small'
              variant='contained'
              loading={isUpdateBtnLoading}
              disabled={!tableData.length > 0 ? true : false}
              onClick={handleTableUpdate}
            >
              Update
            </LoadingButton>
          </span>
        </Tooltip>
      </Stack>
    </>
  );
};

export default TransactionsStack;
