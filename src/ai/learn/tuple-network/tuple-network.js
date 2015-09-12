var _ = require("lodash");
var Tuple = require("./tuple");

function TupleNetwork(arg) {
    this.tuples = [];

    if (_.isNumber(arg)) {
        this.initializeTuples(arg);
    } else if (_.isArray(arg)) {
        this.tuples = arg;
    } else {
        throw new Error("TupleNetwork cannot be initialized");
    }
}

TupleNetwork.prototype.initializeTuples = function(size) {
    var i, j, locations;

    for (i = 0; i < size; i++) {
        locations = [];
        for (j = i * size; j < (i + 1) * size; j++) {
            locations.push(j);
        }
        this.tuples.push(new Tuple(locations));
    }

    for (i = 0; i < size; i++) {
        locations = [];
        for (j = i; j < Math.pow(size, 2); j += size) {
            locations.push(j);
        }
        this.tuples.push(new Tuple(locations));
    }

    for (i = 0; i < size - 1; i++) {
        for (j = 0; j < size - 1; j++) {
            locations = [];
            locations.push(i * size + j);
            locations.push(i * size + j + 1);
            locations.push((i + 1) * size + j);
            locations.push((i + 1) * size + j + 1);
            this.tuples.push(new Tuple(locations));
        }
    }
};

TupleNetwork.deserialize = function(serialized) {
    var tuples = serialized.tuples.map(function(tuple) {
        return Tuple.deserialize(tuple);
    });
    return new TupleNetwork(tuples);
};

TupleNetwork.prototype.getLocationValues = function(grid, locations) {
    var i;
    var values = [];
    for (i = 0; i < locations.length; i++) {
        values.push(grid.value(locations[i]));
    }
    return values;
};

TupleNetwork.prototype.getNetworkValue = function(grid) {
    var i;
    var networkValue = 0;
    for (i = 0; i < this.tuples.length; i++) {
        var locationValues = this.getLocationValues(grid, this.tuples[i].locations);
        networkValue += this.tuples[i].getWeight(locationValues);
    }
    return networkValue;
};

TupleNetwork.prototype.changeWeights = function(grid, change) {
    var i;
    for (i = 0; i < this.tuples.length; i++) {
        var locationValues = this.getLocationValues(grid, this.tuples[i].locations);
        this.tuples[i].changeWeight(locationValues, change);
    }
};

module.exports = TupleNetwork;