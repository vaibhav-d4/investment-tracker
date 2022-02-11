import mongoose from 'mongoose';

const StockTransactionsSchema = mongoose.Schema({
  name: { type: String, required: true },
});

const dbConnection = mongoose.connection.useDb('StockDetailsDB');

const StockTransactionsCollection = dbConnection.model('', StockTransactionsSchema, 'StockTransactionsCollection');

export default StockTransactionsCollection;
