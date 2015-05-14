var Grid = require("../src/core/grid");
var Direction = require("../src/core/direction");
var Search = require("../src/heuristics/search");
var grid = Grid.from([
    0, 4, 4, 2,
    0, 0, 5, 3,
    0, 0, 0, 0,
    0, 0, 0, 0
]);
var result = Search.search(grid);
console.log(result);
//var right = grid.clone();
//right.slide(Direction.Right);
//console.log(right.toString());
//console.log(Search.evaluate(right));
//
//var left = grid.clone();
//left.slide(Direction.Left);
//console.log(left.toString());
//console.log(Search.evaluate(left));
//
//var down = grid.clone();
//down.slide(Direction.Down);
//console.log(down.toString());
//console.log(Search.evaluate(down));
