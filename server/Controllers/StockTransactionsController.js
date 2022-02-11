// SERVER IMPORTS
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// FUNCTION IMPORTS
import StockTransactionsCollection from '../Models/StockTransactionsModel.js';

dotenv.config({ path: './Env/.env' });

//////////////////////// APIS ////////////////////////////////
// GET TABLE DATA
export const getTransactions = async (req, res) => {
  res.status(200).json({ message: 'Inside getTransactions' });
};

// INSERT DATA IN TABLE
export const insertTransaction = async (req, res) => {
  const { name } = req.body;
  try {
    const trxnDetail = await StockTransactionsCollection.create({ name });
    res.status(200).json({ message: 'Inside insertTransaction' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error Occured' });
  }
};
