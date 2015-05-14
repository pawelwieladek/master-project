var Direction = require("../core/direction");
var monotonicity = require("./monotonicity");
var smoothness = require("./smoothness");
var availability = require("./availability");
var maximization = require("./maximization");

var Weights = {
    monotonicity: 1.0,
    smoothness: 0.7,
    availability: 2.4,
    maximization: 7.0
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
        return Search.alphabeta(grid, 4, true, [], -Infinity, Infinity)
    },
    alphabeta: function(grid, depth, playerTurn, best, alpha, beta) {
    if (grid.max() === 11 || depth === 0) {
        return {
            score: Search.evaluate(grid),
            path: best
        };
    }

    if (playerTurn) {
        var steps = best.slice(0);
        playerMoves(grid).forEach(function(move) {
            var path = steps.slice(0);
            path.push(move.direction);
            var result = Search.alphabeta(move.grid, depth - 1, !playerTurn, path, alpha, beta);
            if (result.score >= alpha) {
                alpha = result.score;
                steps = result.path;
            }
            if (alpha >= beta ) return false;
        });
        best = steps.concat(steps);
        return {
            score: alpha,
            path: best
        };
    } else {
        opponentMoves(grid).forEach(function(opponentGrid) {
            var result = Search.alphabeta(opponentGrid, depth - 1, !playerTurn, best, alpha, beta);
            if (result.score < beta) {
                beta = result.score;
            }
            if (alpha >= beta ) return false;
        });
        return {
            score: beta,
            path: best
        };
    }
}
};

module.exports = Search;