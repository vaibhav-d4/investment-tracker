// SERVER IMPORTS
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// ROUTES IMPORTS
import UserDetailsRoutes from './Routes/UserDetailsRoutes.js';

const app = express();
dotenv.config({ path: './Env/.env' });

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/user', UserDetailsRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

const PORT = process.env.PORT || 5000;

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
