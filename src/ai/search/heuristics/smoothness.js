var Direction = require("../../../game/direction");
var Smoothness = {
    compare: function(grid, index, direction) {
        var neighbour = grid.neighbour(index, direction);
        if (neighbour === null) return 0;
        return Math.abs(grid.compare(index, neighbour));
    },
    evaluate: function(grid, direction) {
        var sum = 0;
        grid.cells(direction).forEach(function(index) {
            if (grid.value(index) === 0) return;
            sum += Smoothness.compare(grid, index, direction);
        });
        return sum;
    },
    value: function(grid) {
        return -(Smoothness.evaluate(grid, Direction.Down) + Smoothness.evaluate(grid, Direction.Right));
    }
};

module.exports = function(grid) {
    return Smoothness.value(grid);
};