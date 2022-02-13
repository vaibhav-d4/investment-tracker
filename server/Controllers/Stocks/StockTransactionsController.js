// SERVER IMPORTS
import dotenv from 'dotenv';

// FUNCTION IMPORTS
import StockTransactionsCollection from '../../Models/Stocks/StockTransactionsModel.js';
import { addTransactionDataObject } from './StockFunctionsUtil.js';

dotenv.config({ path: './Env/.env' });

//////////////////////// APIS ////////////////////////////////
// GET TABLE DATA
export const getTransactions = async (req, res) => {
  res.status(200).json({ message: 'Inside getTransactions' });
};

// INSERT DATA IN TABLE
export const addTransaction = async (req, res) => {
  try {
    const { userId, userName, userEmail } = req;

    const transactionData = await addTransactionDataObject(userId, userName, userEmail, req.body);
    const addedTransactionData = await StockTransactionsCollection.create(transactionData);

    if (addedTransactionData) res.status(202).json({ message: 'Transaction Added Successfully.' });
    else res.status(400).json({ error: 'Unexpected error. Please try again.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error occured. Please try again.' });
  }
};
