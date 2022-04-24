// FUNCTION IMPORTS
import AccountsInfoCollection from '../../../Models/Banks and Accounts/Accounts/AccountsModel.js';
import { addAccountObject } from './AccountsUtil.js';

// GET ACCOUNTS OR CATEGORY INFO
export const getAccountsInfo = async (req, res) => {
  try {
    const { userId } = req;

    const userAccounts = await AccountsInfoCollection.find({ userId });

    if (userAccounts) res.status(200).json({ accountsInfo: userAccounts, message: 'Data fetched successfully.' });
    else res.status(400).json({ error: 'Error. Please try again.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error occured. Please try again.' });
  }
};

// ADD ACCOUNT OR CATEGORY
export const addAccountCategory = async (req, res) => {
  try {
    const { userId, userName, userEmail } = req;
    const accountData = await addAccountObject(userId, userName, userEmail, req.body);

    const addedAccountData = await AccountsInfoCollection.create(accountData);

    if (addedAccountData) res.status(202).json({ message: 'Account Added Successfully.' });
    else res.status(400).json({ error: 'Error. Please try again.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error occured. Please try again.' });
  }
};
