// SERVER IMPORTS
import yahooFinance from 'yahoo-finance';
import * as formulajs from '@formulajs/formulajs';

// To create the data object for addTransaction API
export const addTransactionDataObject = async (userId, userName, userEmail, requestBody) => {
  try {
    const { depositoryName, yahooSymbolURL, buyDate, noOfShares, priceOfShareAtBuy } = requestBody;
    const yahooSymbol = await getYahooSymbolFromURL(yahooSymbolURL);
    const symbolData = await getYahooSymbolData(yahooSymbol);

    // to Set all the columns values in Add Transaction Data Object
    const companyName = await getCompanyName(symbolData);
    const finalBuyDate = await getUserBuyDate(buyDate);
    const buyDateForDB = await getDBBuyDate(buyDate);
    const priceOfShareAtToday = await getPriceOfShareAtToday(symbolData);
    const totalInvestedAmount = await getTotalInvestmentAmount(noOfShares, priceOfShareAtBuy);
    const totalCurrentAmount = await getTotalCurrentAmount(noOfShares, priceOfShareAtToday);
    const PNLTillDate = await getPNLTillDate(totalInvestedAmount, totalCurrentAmount);
    const investedTerm = await getInvestedTerm(buyDate);
    const rateOfReturn = await getRateOfReturn(totalInvestedAmount, totalCurrentAmount);
    const RORAnnualized = await getRORAnnualized(totalInvestedAmount, totalCurrentAmount, investedTerm);
    const priceChangePerShare = await getPriceChangePerShare(symbolData);
    const percentageChangePerShare = await getPercentageChangePerShare(symbolData);
    const priceChangeTotalShares = await getPriceChangeTotalShares(noOfShares, priceChangePerShare);
    const lastUpdatedTS = await getLastUpdatedForUser();
    const lastUpdatedTSForDB = await getLastUpdatedForDB();

    // Creating Add Transaction Data Model Object
    const dataObject = {
      userId,
      userName,
      userEmail,
      depositoryName,
      companyName,
      yahooSymbolURL,
      yahooSymbol,
      buyDate: finalBuyDate,
      buyDateForDB,
      noOfShares,
      priceOfShareAtBuy,
      priceOfShareAtToday,
      totalInvestedAmount,
      totalCurrentAmount,
      PNLTillDate,
      investedTerm,
      rateOfReturn,
      RORAnnualized,
      priceChangePerShare,
      percentageChangePerShare,
      priceChangeTotalShares,
      lastUpdatedTS,
      lastUpdatedTSForDB,
    };

    return dataObject;
  } catch (error) {
    console.log('file: StockFunctionsUtil.js ~ addTransactionDataObject ~ error', error);
  }
};

// Update User Transactions
export const updateUserTransactions = async (userTransactions) => {
  try {
    const dataObject = await userTransactions.map(async (item) => {
      const symbolData = await getYahooSymbolData(item.yahooSymbol);

      const priceOfShareAtToday = await getPriceOfShareAtToday(symbolData);
      const totalCurrentAmount = await getTotalCurrentAmount(item.noOfShares, priceOfShareAtToday);
      const PNLTillDate = await getPNLTillDate(item.totalInvestedAmount, totalCurrentAmount);
      const investedTerm = await getInvestedTerm(item.buyDateForDB);
      const rateOfReturn = await getRateOfReturn(item.totalInvestedAmount, totalCurrentAmount);
      const RORAnnualized = await getRORAnnualized(item.totalInvestedAmount, totalCurrentAmount, investedTerm);
      const priceChangePerShare = await getPriceChangePerShare(symbolData);
      const percentageChangePerShare = await getPercentageChangePerShare(symbolData);
      const priceChangeTotalShares = await getPriceChangeTotalShares(item.noOfShares, priceChangePerShare);
      const lastUpdatedTS = await getLastUpdated();

      return {
        ...item._doc,
        priceOfShareAtToday,
        totalCurrentAmount,
        PNLTillDate,
        investedTerm,
        rateOfReturn,
        RORAnnualized,
        priceChangePerShare,
        percentageChangePerShare,
        priceChangeTotalShares,
        lastUpdatedTS,
      };
    });
    const updatedTransactions = await Promise.all(dataObject);
    return updatedTransactions;
  } catch (error) {
    console.log('file: StockFunctionsUtil.js ~ updateUserTransactions ~ error', error);
  }
};

/////////////////// COMMON FUNCTIONS ///////////////////
// Get Yahoo Symbol for URL
export const getYahooSymbolFromURL = async (URL) => {
  const urlParams = new URLSearchParams(URL.split('?')[1]);
  const symbol = urlParams.get('p');
  return symbol;
};

// Get Symbol Data for Yahoo Symbol
export const getYahooSymbolData = async (yahooSymbol) => {
  const result = await yahooFinance.quote({
    symbol: yahooSymbol,
    modules: ['price', 'summaryDetail'],
  });
  return result;
};

export const getCompanyName = async (symbolData) => {
  return symbolData?.price?.longName;
};

export const getUserBuyDate = async (buyDate) => {
  const invertedCommasRemovedBuyDate = buyDate.replaceAll(/['"]+/g, '');
  const tempBuyDate = new Date(invertedCommasRemovedBuyDate);

  const dateSuffix = (date) => {
    if (date > 3 && date < 21) return 'th';
    switch (date % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const date = tempBuyDate.getDate();
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][
    tempBuyDate.getMonth()
  ];
  const year = tempBuyDate.getFullYear();

  const finalBuyDate = `${date}${dateSuffix(date)} ${month} ${year}`;
  return finalBuyDate;
};

export const getDBBuyDate = async (buyDate) => {
  const dateForDB = buyDate.replaceAll(/['"]+/g, '');
  return dateForDB;
};

export const getPriceOfShareAtToday = async (symbolData) => {
  return (symbolData?.price?.regularMarketPrice).toFixed(2);
};

export const getTotalInvestmentAmount = async (noOfShares, priceOfShareAtBuy) => {
  return (noOfShares * priceOfShareAtBuy).toFixed(2);
};

export const getTotalCurrentAmount = async (noOfShares, priceOfShareAtToday) => {
  return (noOfShares * priceOfShareAtToday).toFixed(2);
};

export const getPNLTillDate = async (totalInvestedAmount, totalCurrentAmount) => {
  return (totalCurrentAmount - totalInvestedAmount).toFixed(2);
};

export const getInvestedTerm = async (buyDate) => {
  const invertedCommasRemovedBuyDate = buyDate.replaceAll(/['"]+/g, '');
  const tempBuyDate = new Date(invertedCommasRemovedBuyDate);
  const finalBuyDate = `${tempBuyDate.getMonth() + 1}/${tempBuyDate.getDate()}/${tempBuyDate.getFullYear()}`;
  const todayDate = new Date();
  const finalTodayDate = `${todayDate.getMonth() + 1}/${todayDate.getDate()}/${todayDate.getFullYear()}`;
  try {
    const investedTerm = formulajs.YEARFRAC(finalBuyDate, finalTodayDate).toFixed(2);
    return investedTerm;
  } catch (error) {
    console.log(error);
  }
};

export const getRateOfReturn = async (totalInvestedAmount, totalCurrentAmount) => {
  // ROR formula = (((currentValue-initialValue)/initialValue)*100)
  const ROR = (((totalCurrentAmount - totalInvestedAmount) / totalInvestedAmount) * 100).toFixed(2);
  return ROR;
};

export const getRORAnnualized = async (totalInvestedAmount, totalCurrentAmount, investedTerm) => {
  // Annual ROR (or) CAGR formula = (((currentValue/initialValue)**(1/investedTerm))-1)
  const CAGR = (((totalCurrentAmount / totalInvestedAmount) ** (1 / investedTerm) - 1) * 100).toFixed(2);
  return CAGR;
};

export const getPriceChangePerShare = async (symbolData) => {
  return (symbolData?.price?.regularMarketChange).toFixed(2);
};

export const getPercentageChangePerShare = async (symbolData) => {
  return (symbolData?.price?.regularMarketChangePercent * 100).toFixed(2);
};

export const getPriceChangeTotalShares = async (noOfShares, priceChangePerShare) => {
  return (noOfShares * priceChangePerShare).toFixed(2);
};

export const getLastUpdatedForUser = async () => {
  return new Date().toLocaleString();
};

export const getLastUpdatedForDB = async () => {
  return new Date();
};
