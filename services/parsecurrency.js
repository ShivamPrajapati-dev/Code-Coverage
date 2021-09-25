const currency = require("currency.js");

function parseCurrency(amount) {
  return currency(amount).value;
}

module.exports = parseCurrency;
