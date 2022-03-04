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

// DELETE TABLE
export const deleteTransactions = async (req, res) => {
  try {
    const { userId } = req;
    const { deleteTransactionIds } = req.body;

    var totalDeletedCount = 0;
    const deletedRecords = deleteTransactionIds.map(async (item) => {
      const singleDeleteResult = await StockTransactionsCollection.deleteOne({ _id: item, userId });
      if (singleDeleteResult.deletedCount === 1) {
        totalDeletedCount++;
      }
    });
    await Promise.all(deletedRecords);

    if (totalDeletedCount === 0) throw new error('Stocks Transactions were not deleted successfully.');
    else if (totalDeletedCount === deleteTransactionIds.length) {
      res.status(200).json({ message: `${totalDeletedCount} Transactions deleted successfully.` });
    } else {
      res.status(400).json({
        error: `Only ${totalDeletedCount} out of ${deleteTransactionIds.length} Transactions were deleted successfully.`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error occured. Please try again.' });
  }
};
