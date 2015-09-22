var Direction = require("../../../game/direction");
var Helpers = require("../../../game/helpers");

var Monotonicity = {
    compare: function(grid, index, direction) {
        var next = grid.neighbour(index, direction);
        if (next === null) next = Helpers.shiftIndex(index, direction);
        if (next === null) return 0;
        var value = grid.compare(index, next);
        return value < 0 ? value : 0;
    },
    evaluate: function(grid, direction) {
        var i;
        var sum = 0;
        var cells = Helpers.cells(direction);
        for (i = 0; i < cells.length; i++) {
            if (grid.value(cells[i]) === 0) continue;
            sum += Monotonicity.compare(grid, cells[i], direction);
        }
        return sum;
    },
    value: function(grid) {
        return Math.max(Monotonicity.evaluate(grid, Direction.Down), Monotonicity.evaluate(grid, Direction.Up)) +
            Math.max(Monotonicity.evaluate(grid, Direction.Right), Monotonicity.evaluate(grid, Direction.Left));
    }
};

module.exports = function(grid) {
    return Monotonicity.value(grid);
};