var Tuple = require("./tuple");
var Config = require("../../../../config/const");

function TupleNetwork(params) {
    params = params || {};
    if (params.tuples) {
        this.tuples = new Array(params.tuples.length);
        for (var i = 0; i < params.tuples.length; i++) {
            this.tuples[i] = new Tuple(params.tuples[i].locations, params.tuples[i].lookupTable);
        }
    } else {
        this.initializeTuples();
    }
}

TupleNetwork.prototype.initializeTuples = function() {
    var i, j, locations;

    this.tuples = [];
    for (i = 0; i < Config.GridSize; i++) {
        locations = [];
        for (j = i * Config.GridSize; j < (i + 1) * Config.GridSize; j++) {
            locations.push(j);
        }
        this.tuples.push(new Tuple(locations));
    }

    for (i = 0; i < Config.GridSize; i++) {
        locations = [];
        for (j = i; j < Math.pow(Config.GridSize, 2); j += Config.GridSize) {
            locations.push(j);
        }
        this.tuples.push(new Tuple(locations));
    }

    for (i = 0; i < Config.GridSize - 1; i++) {
        for (j = 0; j < Config.GridSize - 1; j++) {
            locations = [];
            locations.push(i * Config.GridSize + j);
            locations.push(i * Config.GridSize + j + 1);
            locations.push((i + 1) * Config.GridSize + j);
            locations.push((i + 1) * Config.GridSize + j + 1);
            this.tuples.push(new Tuple(locations));
        }
    }
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