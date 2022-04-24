// FUNCTION IMPORTS
import AccountsInfoCollection from '../../../Models/Banks and Accounts/Accounts/AccountsModel.js';
import { addAccountObject } from './AccountsUtil.js';

// ADD ACCOUNT OR CATEGORY
export const addAccountCategory = async (req, res) => {
  const { userId, userName, userEmail } = req;
  const accountData = await addAccountObject(userId, userName, userEmail, req.body);

  const addedAccountData = await AccountsInfoCollection.create(accountData);

  if (addedAccountData) res.status(202).json({ message: 'Account Added Successfully.' });
  else res.status(400).json({ error: 'Error. Please try again.' });

  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error occured. Please try again.' });
  }
};
