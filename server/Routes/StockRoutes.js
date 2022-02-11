// SERVER IMPORTS
import express from 'express';

// FUNCTIONS IMPORTS
import { getTransactions, insertTransaction } from '../Controllers/StockTransactionsController.js';

const router = express.Router();

// CHECK API - http://localhost:PORT/stocks
router.get('/', function (req, res) {
  res.send({ message: 'Stocks Route Working' });
});

// GET TRANSACTIONS API - http://localhost:PORT/stocks/getTransactions
router.get('/getTransactions', getTransactions);

// INSERT TRANSACTION API - http://localhost:PORT/stocks/insertTransaction
router.post('/insertTransaction', insertTransaction);

export default router;
