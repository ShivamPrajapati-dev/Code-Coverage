let parseCurrency = require("../../services/parsecurrency");

describe("Parse currency to positive Number", function () {
  it("should return number", function () {
    var _amount = "$500";
    var result = parseCurrency(_amount);
    expect(result).toEqual(500);
  });

  it("should return negative number", function () {
    var _amount = "-$500";
    var result = parseCurrency(_amount);
    expect(result).toEqual(-500);
  });

  it("should return zero", function () {
    var _amount = "*&*^&%$&";
    var result = parseCurrency(_amount);
    expect(result).toEqual(0);
  });
});
