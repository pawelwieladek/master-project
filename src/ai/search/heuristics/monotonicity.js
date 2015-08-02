var Direction = require("../../../game/direction");
var Monotonicity = {
    compare: function(grid, index, direction) {
        var next = grid.neighbour(index, direction);
        if (next === null) next = grid.shiftIndex(index, direction);
        if (next === null) return 0;
        var value = grid.compare(index, next);
        return value < 0 ? value : 0;
    },
    evaluate: function(grid, direction) {
        var sum = 0;
        grid.cells(direction).forEach(function(index) {
            if (grid.value(index) === 0) return;
            sum += Monotonicity.compare(grid, index, direction);
        });
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