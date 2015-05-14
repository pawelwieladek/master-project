var Direction = require("../core/direction");
var monotonicity = require("./monotonicity");
var smoothness = require("./smoothness");
var availability = require("./availability");
var maximization = require("./maximization");

var Weights = {
    monotonicity: 1.0,
    smoothness: 1.0,
    availability: 1.0,
    maximization: 1.0
};

var OpponentValues = [1, 2];

function playerMoves(grid) {
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
}

function opponentMoves(grid) {
    var i;
    var moves = [];
    var best = Infinity;
    OpponentValues.forEach(function(value) {
        for (i = 0; i < grid.tiles.length; i++) {
            if (grid.value(i) === 0) {
                var clone = grid.clone();
                clone.add(i, value);
                var evaluation = Search.evaluate(clone);
                if (evaluation === best) {
                    moves.push(clone);
                } else if (evaluation < best) {
                    best = evaluation;
                    moves = [clone];
                }
            }
        }
    });
    return moves;
}

var Search = {
    evaluate: function(grid) {
        return Weights.monotonicity * monotonicity(grid) +
            Weights.smoothness * smoothness(grid) +
            Weights.availability * availability(grid) +
            Weights.maximization * maximization(grid);
    },
    search: function(grid) {
        return Search.minimax(grid, 7, true);
    },
    minimax: function(grid, depth, playerTurn) {
        var bestMove = null;
        var bestValue;
        if (grid.max() === 11 || depth === 0) {
            return {
                score: Search.evaluate(grid),
                move: bestMove
            };
        }

        if (playerTurn) {
            bestValue = -Infinity;
            playerMoves(grid).forEach(function(move) {
                var result = Search.minimax(move.grid, depth - 1, !playerTurn);
                if (result.score > bestValue) {
                    bestValue = result.score;
                    bestMove = move.direction;
                }
            });
            return {
                score: bestValue,
                move: bestMove
            };
        } else {
            bestValue = Infinity;
            opponentMoves(grid).forEach(function(opponentGrid) {
                var result = Search.minimax(opponentGrid, depth - 1, !playerTurn);
                if (result.score < bestValue) {
                    bestValue = result.score;
                }
            });
            return {
                score: bestValue,
                path: bestMove
            };
        }
    }
};

module.exports = Search;