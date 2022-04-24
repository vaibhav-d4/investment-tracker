import mongoose from 'mongoose';

const AddAccountsSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  accountName: { type: String, required: true },
  initialBalance: { type: String, required: true },
  accountHolderName: { type: String },
  accountNumber: { type: Number },
  IFSCCode: { type: String },
  branchName: { type: String },
});

const dbConnection = mongoose.connection.useDb('BanksAndAccountsDB');

const AccountsInfoCollection = dbConnection.model('', AddAccountsSchema, 'AccountsInfoCollection');

export default AccountsInfoCollection;
