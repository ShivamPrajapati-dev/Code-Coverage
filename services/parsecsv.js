const cvstojson = require("csvtojson");

async function parseCSV(filename) {
  const jsonObj = await cvstojson({ delimiter: ";" }).fromFile(filename);
  return jsonObj;
}

module.exports = parseCSV;
