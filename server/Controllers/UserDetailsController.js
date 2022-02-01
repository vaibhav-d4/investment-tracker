// SERVER IMPORTS
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

// FUNCTION IMPORTS
import User from '../Models/UserDetailsModel.js';

dotenv.config({ path: './Env/.env' });

// TIMESTAMP FUNCTION
const getCurrentTime = async () => {
  const getTimeURL = 'https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Kolkata';
  const response = await axios.get(getTimeURL);
  let currentTime = response.data.dateTime;
  const finalTime = `Time: ${currentTime.split('T')[1].split('.')[0]}, Date: ${currentTime.split('T')[0]}`;
  return finalTime;
};

// CONSTRUCT DATA OBJECT WHICH HAS TO BE SENT TO CLIENT
const constructDataObject = (user) => {
  const dataObject = {
    _id: user._id,
    name: user.name,
    email: user.email,
    imageUrl: user.imageUrl,
  };
  return dataObject;
};

//////////////////////// APIS ////////////////////////////////
// USER REGISTRATION
export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists.' });

    if (password !== confirmPassword) return res.status(400).json({ message: "Password's do not match." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const registerTimestamp = await getCurrentTime();
    const userData = await User.create({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      registerTimestamp: registerTimestamp,
      googleUser: 'No',
      imageUrl: '',
    });

    const jwtToken = jwt.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    const dataToSend = constructDataObject(userData);

    res.status(201).json({ userData: dataToSend, jwtToken });
  } catch (error) {
    console.log('file: UserDetailsController.js ~ line 52 ~ register ~ error', error);

    res.status(400).json({ error: 'Registration failed. Please try again.' });
  }
};

// USER LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid Email and Password' });

    const jwtToken = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    const dataToSend = constructDataObject(existingUser);

    res.status(200).json({ userData: dataToSend, jwtToken });
  } catch (error) {
    res.status(400).json({ error: 'Login failed. Please try again.' });
  }
};

// GOOGLE LOGIN
export const googleLogin = async (req, res) => {
  const { email, givenName, familyName, imageUrl } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    let userData = {};
    const registerTimestamp = await getCurrentTime();
    if (existingUser?.googleUser === 'No') {
      res.status(400).json({ message: 'User already registered. Please Login.' });
    } else {
      if (existingUser) {
        userData = {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          imageUrl: existingUser.imageUrl,
        };
      } else {
        userData = await User.create({
          name: `${givenName} ${familyName}`,
          email,
          password: 'NA (Google User)',
          registerTimestamp: registerTimestamp,
          googleUser: 'Yes',
          imageUrl: imageUrl,
        });
      }

      const jwtToken = jwt.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      const dataToSend = constructDataObject(userData);

      res.status(202).json({ userData: dataToSend, jwtToken });
    }
  } catch (error) {
    res.status(400).json({ error: 'Login failed. Please try again.' });
  }
};
