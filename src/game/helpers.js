var _ = require("lodash");
var Direction = require("./direction");
var Config = require("../../config/config");

var shiftIndex = function(index, direction) {
    switch (direction) {
        case Direction.Up: return index >= Config.GridSize ? index - Config.GridSize : null;
        case Direction.Down: return index < Math.pow(Config.GridSize, 2) - Config.GridSize ? index + Config.GridSize : null;
        case Direction.Left: return index % Config.GridSize !== 0 ? index - 1 : null;
        case Direction.Right: return (index + 1) % Config.GridSize !== 0 ? index + 1 : null;
    }
};

var cells = function(direction) {
    var i, j, k;
    var cells = new Array(Math.pow(Config.GridSize, 2));
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
            for (i = 0; i < Config.GridSize; i++)
                for (j = 0; j < Config.GridSize; j++)
                    cells[k++] = i + j * Config.GridSize;
            if (direction === Direction.Up) cells.reverse();
            return cells;
    }
};

var Helpers = {
    shiftIndex: _.memoize(shiftIndex, function(index, direction) {
        return "" + index + direction;
    }),
    cells: _.memoize(cells)
};

module.exports = Helpers;