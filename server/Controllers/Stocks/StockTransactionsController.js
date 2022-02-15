// SERVER IMPORTS
import dotenv from 'dotenv';

// FUNCTION IMPORTS
import StockTransactionsCollection from '../../Models/Stocks/StockTransactionsModel.js';
import { addTransactionDataObject, updateUserTransactions } from './StockFunctionsUtil.js';

dotenv.config({ path: './Env/.env' });

//////////////////////// APIS ////////////////////////////////
// GET TRANSACTIONS
export const getTransactions = async (req, res) => {
  try {
    const { userId } = req;

    const userTransactions = await StockTransactionsCollection.find({ userId });

    if (userTransactions)
      res.status(200).json({ transactionDetails: userTransactions, message: 'Data fetched successfully.' });
    else res.status(400).json({ error: 'Error. Please try again.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error occured. Please try again.' });
  }
};

// INSERT DATA IN TABLE
export const addTransaction = async (req, res) => {
  try {
    const { userId, userName, userEmail } = req;

    const transactionData = await addTransactionDataObject(userId, userName, userEmail, req.body);
    const addedTransactionData = await StockTransactionsCollection.create(transactionData);

    if (addedTransactionData) res.status(202).json({ message: 'Transaction Added Successfully.' });
    else res.status(400).json({ error: 'Error. Please try again.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error occured. Please try again.' });
  }
};

// UPDATE TRANSACTIONS
export const updateTransactions = async (req, res) => {
  try {
    const { userId } = req;

    const userTransactions = await StockTransactionsCollection.find({ userId });

    const updatedTransactions = await updateUserTransactions(userTransactions);
    const dataObject = updatedTransactions.map(async (item) => {
      const updatedData = await StockTransactionsCollection.findByIdAndUpdate(item._id, item, { new: true });
      return updatedData;
    });
    const finalUpdated = await Promise.all(dataObject);

    if (finalUpdated) res.status(200).json({ transactionDetails: finalUpdated, message: 'Data updated successfully.' });
    else res.status(400).json({ error: 'Error. Please try again.' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error occured. Please try again.' });
  }
};
