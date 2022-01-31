// SERVER IMPORTS
import express from 'express';

// FUNCTIONS IMPORTS
import { login, register } from '../Controllers/UserDetailsController.js';

const router = express.Router();

// CHECK API - http://localhost:PORT/user
router.get('/', function (req, res) {
  res.send({ message: 'User Route Working' });
});

// LOGIN API - http://localhost:PORT/user/login
router.post('/login', login);

// REGISTER API - http://localhost:PORT/user/register
router.post('/register', register);

export default router;
