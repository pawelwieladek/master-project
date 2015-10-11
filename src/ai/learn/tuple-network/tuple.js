var maxPossibleValue = 15;

function Tuple(locations, lookupTable) {
    this.locations = locations;
    this.lookupTable = lookupTable || {};
}

Tuple.prototype.buildKey = function(values) {
    var sum = 0;
    for (var i = 0; i < values.length; i++) {
        sum += values[i] * Math.pow(maxPossibleValue, i);
    }
    return sum;
};

Tuple.prototype.getWeight = function(values) {
    var key = this.buildKey(values);
    return typeof this.lookupTable[key] !== "undefined" ? this.lookupTable[key] : 0;
};

Tuple.prototype.changeWeight = function(values, change) {
    this.lookupTable[this.buildKey(values)] = this.getWeight(values) + change;
};

module.exports = Tuple;