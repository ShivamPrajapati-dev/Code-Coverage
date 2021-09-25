const main = require("../index");

var _output = {
  upst: {
    longTermGain: 30,
    longTermLoss: 0,
    shortTermGain: 2374.95,
    shortTermLoss: -9880.080000000002,
    washLoss: -2510.02,
  },
};

describe("Calculate Gain, loss and wash loss", function () {
  it("should return loss, gain and wash loss", async function () {
    var result = await main("test_data/stocks.csv");
    expect(JSON.stringify(_output)).toEqual(JSON.stringify(result));
  });
});
