const moment = require("moment");

function numberOfDays(start, end) {
  if (!start || !end) return Infinity;

  var date1 = moment(start, "MM/DD/YYYY");
  var date2 = moment(end, "MM/DD/YYYY");

  return Math.abs(moment.duration(date2.diff(date1)).asDays());
}
module.exports = numberOfDays;
