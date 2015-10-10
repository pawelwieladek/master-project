var Direction = require("./direction");
var Helpers = require("./helpers");
var Const = require("../../config/const");

function Grid(tiles) {
    var i;
    this.tiles = tiles || new Array(Math.pow(Const.GridSize, 2));
    if (!tiles) {
        for (i = 0; i < this.tiles.length; i++)
            this.tiles[i] = 0;
    }
}

Grid.prototype.clone = function() {
    return new Grid(this.tiles.slice(0));
};

Grid.prototype.value = function(index) {
    return this.tiles[index];
};

Grid.prototype.add = function(index, value) {
    return this.tiles[index] = value;
};

Grid.prototype.remove = function(index) {
    return this.tiles[index] = 0;
};

Grid.prototype.moveValue = function(source, destination, value) {
    this.add(destination, value);
    this.remove(source);
};

Grid.prototype.destination = function(index, direction) {
    var indexValue = this.value(index);
    if (indexValue === 0) return index;
    while (true) {
        var next = Helpers.shiftIndex(index, direction);
        if (next === null) break;
        var nextValue = this.value(next);
        if (nextValue === 0) {
            index = next;
        } else if (nextValue === indexValue) {
            index = next;
            break;
        } else {
            break;
        }
    }
    return index;
};

Grid.prototype.neighbour = function(index, direction) {
    if (this.value(index) === 0) return index;
    while (true) {
        var next = Helpers.shiftIndex(index, direction);
        if (next === null) {
            index = null;
            break;
        }
        index = next;
        if (this.value(next) !== 0) break;
    }
    return index;
};

Grid.prototype.compare = function(source, destination) {
    return this.value(destination) - this.value(source);
};

Grid.prototype.slide = function(direction) {
    var i;
    var index;
    var points = 0;
    var moved = false;
    var merged = [];
    var cells = Helpers.cells(Direction.opposite(direction));
    for (i = 0; i < cells.length; i++) {
        index = cells[i];
        var value = this.value(index);
        if (value !== 0) {
            var destination = this.destination(index, direction);
            if (destination !== index) {
                if (this.value(destination) === 0) {
                    this.moveValue(index, destination, this.value(index));
                    moved = true;
                } else if (merged.indexOf(destination) > -1) {
                    destination = Helpers.shiftIndex(destination, Direction.opposite(direction));
                    if (destination === index) continue;
                    this.moveValue(index, destination, this.value(index));
                    moved = true;
                } else {
                    value++;
                    this.moveValue(index, destination, value);
                    moved = true;
                    points += value;
                    merged.push(destination);
                }
            }
        }
    }
    if (moved === true) return points; else return null;
};

Grid.prototype.max = function() {
    return Math.max.apply(null, this.tiles);
};

Grid.prototype.available = function() {
    var i;
    var indexes = [];
    for (i = 0; i < this.tiles.length; i++)
        if (this.value(i) === 0)
            indexes.push(i);
    return indexes;
};

Grid.prototype.toString = function() {
    var i;
    var string = new Array(Const.GridSize);
    for (i = 0; i < Const.GridSize; i++)
        string[i] = this.tiles.slice(i * Const.GridSize, (i + 1) * Const.GridSize).join("\t");
    return string.join("\n");
};

module.exports = Grid;