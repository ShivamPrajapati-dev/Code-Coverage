const parseCSV = require("./services/parsecsv");
const numberOfDays = require("./services/numberofdays");
const parseCurrency = require("./services/parsecurrency");

let uniqueGlobalStocks = {};
let stockComponent = {
  longTermGain: 0,
  longTermLoss: 0,
  shortTermGain: 0,
  shortTermLoss: 0,
  washLoss: 0,
};

function getNameOfStock(description) {
  const name = description.split(" ")[0].toLowerCase();
  if (!uniqueGlobalStocks[name]) {
    uniqueGlobalStocks[name] = { ...stockComponent };
  }
  return name;
}

function addWashLoss(start, end, current, stockDetails) {
  const name = getNameOfStock(stockDetails.description);
  if (numberOfDays(start, current) <= 30 || numberOfDays(end, current) <= 30) {
    uniqueGlobalStocks[name].washLoss += parseCurrency(stockDetails["ST L/G"]);
  }
}

function calculateGainAndLoss(stockDetails) {
  const name = getNameOfStock(stockDetails.description);
  const longTermAmount = parseCurrency(stockDetails["LT L/G"]);
  const shortTermAmount = parseCurrency(stockDetails["ST L/G"]);
  if (longTermAmount > 0) {
    uniqueGlobalStocks[name].longTermGain += longTermAmount;
  } else {
    uniqueGlobalStocks[name].longTermLoss += longTermAmount;
  }

  if (shortTermAmount > 0) {
    uniqueGlobalStocks[name].shortTermGain += shortTermAmount;
  } else {
    uniqueGlobalStocks[name].shortTermLoss += shortTermAmount;
  }
}

function calculateWashLoss(position, stockDetails, allGlobalStocksObjects) {
  const currentClosedDate = stockDetails["Closed Date"];
  const previousStockOpenDate =
    position - 1 >= 0 && !allGlobalStocksObjects[position - 1]["Closed Date"]
      ? allGlobalStocksObjects[position - 1]["Open Date"]
      : undefined;
  const nextStockOpenDate =
    position + 1 < allGlobalStocksObjects.length &&
    !allGlobalStocksObjects[position + 1]["Closed Date"]
      ? allGlobalStocksObjects[position + 1]["Open Date"]
      : undefined;

  if (previousStockOpenDate || nextStockOpenDate) {
    addWashLoss(
      previousStockOpenDate,
      nextStockOpenDate,
      currentClosedDate,
      stockDetails
    );
  }
}

function printStocksData() {
  for (let stock in uniqueGlobalStocks) {
    console.log(`Stock name: ${stock}\n`);
    for (let property in uniqueGlobalStocks[stock]) {
      console.log(`${property}: ${uniqueGlobalStocks[stock][property]}`);
    }
    console.log();
  }
}

async function main(filename) {
  const allGlobalStocksObjects = await parseCSV(filename);
  for (let position = 0; position < allGlobalStocksObjects.length; position++) {
    const stockDetails = allGlobalStocksObjects[position];
    calculateGainAndLoss(stockDetails);
    if (stockDetails["ST L/G"] && parseCurrency(stockDetails["ST L/G"]) < 0)
      calculateWashLoss(position, stockDetails, allGlobalStocksObjects);
  }

  //printStocksData();
  return uniqueGlobalStocks;
}
//main("test_data/stocks.csv")
module.exports = main;
