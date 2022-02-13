import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: './Env/.env' });

const ValidateToken = async (req, res, next) => {
  try {
    const jwtToken = req.headers.authorization.split(' ')[1];
    const isCustomAuth = jwtToken.length < 500;

    let decodedData;

    if (jwtToken && isCustomAuth) {
      decodedData = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
      req.userId = decodedData?.userId;
      req.userName = decodedData?.userName;
      req.userEmail = decodedData?.userEmail;
    }

    next();
  } catch (error) {
    res.status(400).json({ message: 'Authorization Failed' });
  }
};

export default ValidateToken;
