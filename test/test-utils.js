var TestUtils = {
  matchNumberWithin: function(a, b) {
    return sinon.match(function (value) {
      return typeof value === "number" && value >= a && value <= b;
    });
  }
};

module.exports = TestUtils;
