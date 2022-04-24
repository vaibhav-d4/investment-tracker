// CONSTRUCT THE DATA OBJECT FOR THE ADD ACCOUNT API
export const addAccountObject = async (userId, userName, userEmail, requestBody) => {
  const dataObject = {
    userId,
    userName,
    userEmail,
    accountName: requestBody.accountName,
    initialBalance: requestBody.initialBalance,
    accountHolderName: requestBody.accountHolderName,
    accountNumber: requestBody.accountNumber,
    IFSCCode: requestBody.IFSCCode,
    branchName: requestBody.branchName,
  };
  return dataObject;
};
