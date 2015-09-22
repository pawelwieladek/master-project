var Direction = require("../../../game/direction");
var Helpers = require("../../../game/helpers");

var Smoothness = {
    compare: function(grid, index, direction) {
        var neighbour = grid.neighbour(index, direction);
        if (neighbour === null) return 0;
        return Math.abs(grid.compare(index, neighbour));
    },
    evaluate: function(grid, direction) {
        var i, index;
        var sum = 0;
        var cells = Helpers.cells(direction);
        for (i = 0; i < cells.length; i++) {
            if (grid.value(cells[i]) === 0) continue;
            sum += Smoothness.compare(grid, cells[i], direction);
        }
        return sum;
    },
    value: function(grid) {
        return -(Smoothness.evaluate(grid, Direction.Down) + Smoothness.evaluate(grid, Direction.Right));
    }
};

module.exports = function(grid) {
    return Smoothness.value(grid);
};