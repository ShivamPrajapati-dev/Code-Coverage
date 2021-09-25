let numberOfDays = require("../../services/numberofdays");

describe("Calculate number of days between given dates", function () {
  it("should return number of days", function () {
    var _start = "09/25/2021";
    var _end = "09/16/2021";
    var result = numberOfDays(_start, _end);
    expect(result).toEqual(9);
  });

  it("should return Infinity", function () {
    var _start = "09/25/2021";
    var _end = undefined;
    var result = numberOfDays(_start, _end);
    expect(result).toEqual(Infinity);
  });
});
