// SERVER IMPORTS
import express from 'express';

// FUNCTIONS IMPORTS
import { addAccountCategory } from '../../Controllers/Banks and Accounts/Accounts/AccountsController.js';

// MIDDLEWARE IMPORTS
import ValidateToken from '../../Middleware/ValidateToken.js';

const router = express.Router();

// CHECK API - http://localhost:PORT/banks
router.get('/', function (req, res) {
  res.send({ message: 'Banks and Accounts Route Working' });
});

router.post('/addAccountCategory', ValidateToken, addAccountCategory);

export default router;
