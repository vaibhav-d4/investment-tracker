// SERVER IMPORTS
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// FUNCTION IMPORTS
import User from '../Models/UserDetailsModel.js';

dotenv.config({ path: './Env/.env' });

// USER REGISTRATION
export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists.' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password's do not match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const userData = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      timestamp: new Date(),
      googleUser: 'No',
    });

    const jwtToken = jwt.sign(
      { id: userData._id, email: userData.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ userData, jwtToken });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed. Please try again.' });
  }
};

// USER LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid)
      return res.status(400).json({ message: 'Invalid Email and Password' });

    const jwtToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ userData: existingUser, jwtToken });
  } catch (error) {
    res.status(400).json({ error: 'Login failed. Please try again.' });
  }
};
