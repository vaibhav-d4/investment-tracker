// SERVER IMPORTS
import express from 'express';

// FUNCTIONS IMPORTS
import { login, register, googleLogin } from '../../Controllers/Users/UserDetailsController.js';

const router = express.Router();

// CHECK API - http://localhost:PORT/user
router.get('/', function (req, res) {
  res.send({ message: 'User Route Working' });
});

// LOGIN API - http://localhost:PORT/user/login
router.post('/login', login);

// REGISTER API - http://localhost:PORT/user/register
router.post('/register', register);

// GOOGLE LOGIN API - http://localhost:PORT/user/googleLogin
router.post('/googleLogin', googleLogin);

export default router;
