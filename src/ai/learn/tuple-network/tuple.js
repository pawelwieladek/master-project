function Tuple(locations) {
    this.locations = locations;
    this.lookupTable = {};
}

Tuple.deserialize = function(serialized) {
    var tuple = new Tuple(serialized.locations);
    tuple.lookupTable = serialized.lookupTable;
    return tuple;
};

Tuple.prototype.buildKey = function(values) {
    return values.join(':');
};

Tuple.prototype.getWeight = function(values) {
    var key = this.buildKey(values);
    return typeof this.lookupTable[key] !== "undefined" ? this.lookupTable[key] : 0;
};

Tuple.prototype.changeWeight = function(values, change) {
    this.lookupTable[this.buildKey(values)] = this.getWeight(values) + change;
};

module.exports = Tuple;