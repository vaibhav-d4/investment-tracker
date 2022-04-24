// SERVER IMPORTS
import express from 'express';

// FUNCTIONS IMPORTS
import {
  addAccountCategory,
  getAccountsInfo,
} from '../../Controllers/Banks and Accounts/Accounts/AccountsController.js';

// MIDDLEWARE IMPORTS
import ValidateToken from '../../Middleware/ValidateToken.js';

const router = express.Router();

// CHECK API - http://localhost:PORT/banks
router.get('/', function (req, res) {
  res.send({ message: 'Banks and Accounts Route Working' });
});

// GET ACCOUNTS INFO API - http://localhost:PORT/banks/getAccountsInfo
router.get('/getAccountsInfo', ValidateToken, getAccountsInfo);

// ADD ACCOUNT OR CATEGORY API - http://localhost:PORT/banks/addAccountCategory
router.post('/addAccountCategory', ValidateToken, addAccountCategory);

export default router;
