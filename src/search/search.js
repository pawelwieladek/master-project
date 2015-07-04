var Direction = require("../core/direction");
var monotonicity = require("./monotonicity");
var smoothness = require("./smoothness");
var availability = require("./availability");
var maximization = require("./maximization");

function SearchTree(weights, depth) {
    this.depth = depth;
    this.weights = weights;
}

SearchTree.OpponentValues = [1, 2];

SearchTree.prototype.evaluate = function(grid) {
    return this.weights.monotonicity * monotonicity(grid) +
        this.weights.smoothness * smoothness(grid) +
        this.weights.availability * availability(grid) +
        this.weights.maximization * maximization(grid);
};

SearchTree.prototype.search = function(grid) {
    return this.minimax(grid, this.depth, true);
};

SearchTree.prototype.opponentMoves = function(grid) {
    var moves = [];
    var best = Infinity;
    SearchTree.OpponentValues.forEach(function(value) {
        for (var i = 0; i < grid.tiles.length; i++) {
            if (grid.value(i) === 0) {
                var clone = grid.clone();
                clone.add(i, value);
                var evaluation = this.evaluate(clone);
                if (evaluation === best) {
                    moves.push(clone);
                } else if (evaluation < best) {
                    best = evaluation;
                    moves = [clone];
                }
            }
        }
    }.bind(this));
    return moves;
};

SearchTree.prototype.playerMoves = function(grid) {
    var moves = [];
    Direction.all().forEach(function(direction) {
        var clone = grid.clone();
        var points = clone.slide(direction);
        if (points !== null)
            moves.push({
                direction: direction,
                grid: clone
            });
    });
    return moves;
};

SearchTree.prototype.minimax = function(grid, depth, playerTurn) {
    var bestDirection = null;
    var bestValue;
    if (grid.max() === 11 || depth === 0) {
        return {
            score: this.evaluate(grid),
            direction: bestDirection
        };
    }

    if (playerTurn) {
        bestValue = -Infinity;
        this.playerMoves(grid).forEach(function(move) {
            var result = this.minimax(move.grid, depth - 1, !playerTurn);
            if (result.score > bestValue) {
                bestValue = result.score;
                bestDirection = move.direction;
            }
        }.bind(this));
        return {
            score: bestValue,
            direction: bestDirection
        };
    } else {
        bestValue = Infinity;
        this.opponentMoves(grid).forEach(function(opponentGrid) {
            var result = this.minimax(opponentGrid, depth - 1, !playerTurn);
            if (result.score < bestValue) {
                bestValue = result.score;
            }
        }.bind(this));
        return {
            score: bestValue,
            direction: bestDirection
        };
    }
};

module.exports = SearchTree;