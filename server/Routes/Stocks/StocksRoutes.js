// SERVER IMPORTS
import express from 'express';

// FUNCTIONS IMPORTS
import {
  getTransactions,
  addTransaction,
  updateTransactions,
  deleteTransactions,
} from '../../Controllers/Stocks/StockTransactionsController.js';

// MIDDLEWARE IMPORTS
import ValidateToken from '../../Middleware/ValidateToken.js';

const router = express.Router();

// CHECK API - http://localhost:PORT/stocks
router.get('/', function (req, res) {
  res.send({ message: 'Stocks Route Working' });
});

// GET TRANSACTIONS API - http://localhost:PORT/stocks/getTransactions
router.get('/getTransactions', ValidateToken, getTransactions);

// INSERT TRANSACTION API - http://localhost:PORT/stocks/addTransaction
router.post('/addTransaction', ValidateToken, addTransaction);

// UPDATE TRANSACTIONS API - http://localhost:PORT/stocks/updateTransactions
router.get('/updateTransactions', ValidateToken, updateTransactions);

// DELETE TRANSACTIONS API - http://localhost:PORT/stocks/deleteTransactions
router.delete('/deleteTransactions', ValidateToken, deleteTransactions);

export default router;
