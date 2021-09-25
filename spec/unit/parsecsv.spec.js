let parseCSV = require("../../services/parsecsv");

var _output1 = [
  {
    description: "Upst 04/16/2021 Put $100.00",
    "Open Date": "04/12/2021",
    Event: "Expiration",
    Qty: "3",
    Cost: "$0.00",
    "LT L/G": "$0.00",
    "ST L/G": "$374.98",
    "Closed Date": "04/16/2021",
    Proceeds: "$374.98",
  },
  {
    description: "UPST 04/16/2021 PUT $95.00",
    "Open Date": "04/12/2021",
    Event: "Expiration",
    Qty: "3",
    Cost: "$210.00",
    "LT L/G": "$0.00",
    "ST L/G": "-$210.00",
    "Closed Date": "04/16/2021",
    Proceeds: "$0.00",
  },
];

describe("Parse CSV file test", function () {
  it("should convert csv to json", async function () {
    var result = await parseCSV("test_data/test.csv");
    expect(JSON.stringify(result)).toEqual(JSON.stringify(_output1));
  });
});
