var Direction = require("./direction");

function Grid(size) {
    var i;
    this.size = size || 4;
    this.tiles = new Array(Math.pow(this.size, 2));
    for (i = 0; i < this.tiles.length; i++)
        this.tiles[i] = 0;
}

Grid.from = function(array) {
    var size = parseInt(Math.sqrt(array.length));
    var grid = new Grid(size);
    grid.tiles = array.slice(0, Math.pow(size, 2));
    return grid;
};

Grid.prototype.clone = function() {
    var clone = new Grid(this.size);
    clone.tiles = this.tiles.slice(0);
    return clone;
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

// TODO: memoization
Grid.prototype.shiftIndex = function(index, direction) {
    switch (direction) {
        case Direction.Up: return index >= this.size ? index - this.size : null;
        case Direction.Down: return index < this.tiles.length - this.size ? index + this.size : null;
        case Direction.Left: return index % this.size !== 0 ? index - 1 : null;
        case Direction.Right: return (index + 1) % this.size !== 0 ? index + 1 : null;
    }
};

Grid.prototype.moveValue = function(source, destination, value) {
    this.add(destination, value);
    this.remove(source);
};

// TODO: memoization
Grid.prototype.cells = function(direction) {
    var i, j, k;
    var cells = new Array(this.tiles.length);
    switch (direction) {
        case Direction.Left:
        case Direction.Right:
            for (i = 0; i < cells.length; i++)
                cells[i] = i;
            if (direction === Direction.Left) cells.reverse();
            return cells;
        case Direction.Up:
        case Direction.Down:
            k = 0;
            for (i = 0; i < this.size; i++)
                for (j = 0; j < this.size; j++)
                    cells[k++] = i + j * this.size;
            if (direction === Direction.Up) cells.reverse();
            return cells;
    }
};

Grid.prototype.destination = function(index, direction) {
    var indexValue = this.value(index);
    if (indexValue === 0) return index;
    while (true) {
        var next = this.shiftIndex(index, direction);
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
        var next = this.shiftIndex(index, direction);
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
    var points = 0;
    var moved = false;
    var merged = [];
    this.cells(Direction.opposite(direction)).forEach(function(index) {
        var value = this.value(index);
        if (value !== 0) {
            var destination = this.destination(index, direction);
            if (destination !== index) {
                if (this.value(destination) === 0) {
                    this.moveValue(index, destination, this.value(index));
                    moved = true;
                } else if (merged.indexOf(destination) > -1) {
                    destination = this.shiftIndex(destination, Direction.opposite(direction));
                    if (destination === index) return;
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
    }.bind(this));
    if (moved === true) return points; else return null;
};

Grid.prototype.max = function() {
    return Math.max.apply(null, this.tiles);
};

Grid.prototype.toString = function() {
    var i;
    var string = new Array(this.size);
    for (i = 0; i < this.size; i++)
        string[i] = this.tiles.slice(i * this.size, (i + 1) * this.size).join("\t");
    return string.join("\n");
};

module.exports = Grid;