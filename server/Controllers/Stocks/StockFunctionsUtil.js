// SERVER IMPORTS
import yahooFinance from 'yahoo-finance';
import * as formulajs from '@formulajs/formulajs';

// Get Symbol Data for Yahoo Symbol
export const getYahooSymbolData = async (yahooSymbol) => {
  const result = await yahooFinance.quote({
    symbol: yahooSymbol,
    modules: ['price', 'summaryDetail'],
  });
  return result;
};

// To create the data object for addTransaction API
export const addTransactionDataObject = async (userId, userName, userEmail, requestBody) => {
  try {
    const { depositoryName, yahooSymbol, buyDate, noOfShares, priceOfShareAtBuy } = requestBody;
    const symbolData = await getYahooSymbolData(yahooSymbol);

    // to Set all the columns values in Add Transaction Data Object
    const companyName = await getCompanyName(symbolData);
    const finalBuyDate = await getBuyDate(buyDate);
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
    const lastUpdatedTS = await getLastUpdated();

    // Creating Add Transaction Data Model Object
    const dataObject = {
      userId,
      userName,
      userEmail,
      depositoryName,
      companyName,
      yahooSymbol,
      buyDate: finalBuyDate,
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
    };

    return dataObject;
  } catch (error) {
    console.log('error', error);
  }
};

/////////////////// COMMON FUNCTIONS ///////////////////
export const getCompanyName = async (symbolData) => {
  return symbolData?.price?.longName;
};

export const getBuyDate = async (buyDate) => {
  const invertedCommasRemovedBuyDate = buyDate.replaceAll(/['"]+/g, '');
  const tempBuyDate = new Date(invertedCommasRemovedBuyDate);
  const finalBuyDate = `${tempBuyDate.getDate()}/${tempBuyDate.getMonth() + 1}/${tempBuyDate.getFullYear()}`;
  return finalBuyDate;
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

export const getLastUpdated = async () => {
  return new Date().toLocaleString();
};
