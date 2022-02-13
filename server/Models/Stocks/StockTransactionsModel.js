import mongoose from 'mongoose';

const StockTransactionsSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  depositoryName: { type: String, required: true },
  companyName: { type: String, required: true },
  // googleSymbol: { type: String, required: true },
  yahooSymbol: { type: String, required: true },
  buyDate: { type: String, required: true },
  noOfShares: { type: String, required: true },
  priceOfShareAtBuy: { type: String, required: true },
  priceOfShareAtToday: { type: String, required: true },
  totalInvestedAmount: { type: String, required: true },
  totalCurrentAmount: { type: String, required: true },
  PNLTillDate: { type: String, required: true },
  investedTerm: { type: String, required: true },
  rateOfReturn: { type: String, required: true },
  RORAnnualized: { type: String, required: true },
  priceChangePerShare: { type: String, required: true },
  percentageChangePerShare: { type: String, required: true },
  priceChangeTotalShares: { type: String, required: true },
  lastUpdatedTS: { type: String, required: true },
});

const dbConnection = mongoose.connection.useDb('StockDetailsDB');

const StockTransactionsCollection = dbConnection.model('', StockTransactionsSchema, 'StockTransactionsCollection');

export default StockTransactionsCollection;
