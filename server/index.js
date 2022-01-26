import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config({ path: './env/.env' });

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// app.use("/posts", postRoutes);
// app.use("/user", userRoutes);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

// MONGOOSE CONNECTION

// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
//   )
//   .catch((error) => console.log(error.message));
