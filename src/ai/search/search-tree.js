var Config = require("../../../config/config");
var Direction = require("../../game/direction");
var monotonicity = require("./heuristics/monotonicity");
var smoothness = require("./heuristics/smoothness");
var availability = require("./heuristics/availability");
var maximization = require("./heuristics/maximization");

function SearchTree(params) {
    params = params || {};
    this.depth = params.depth || Config.Defaults.Search.Depth;
    this.monotonicity = params.monotonicity || Config.Defaults.Search.Monotonicity;
    this.smoothness = params.smoothness || Config.Defaults.Search.Smoothness;
    this.availability = params.availability || Config.Defaults.Search.Availability;
    this.maximization = params.maximization || Config.Defaults.Search.Maximization;
}

SearchTree.prototype.evaluate = function(grid) {
    return this.monotonicity * monotonicity(grid) +
        this.smoothness * smoothness(grid) +
        this.availability * availability(grid) +
        this.maximization * maximization(grid);
};

SearchTree.prototype.search = function(grid) {
    return this.minimax(grid, this.depth, true, -Infinity, Infinity);
};

SearchTree.prototype.opponentMoves = function(grid) {
    var moves = [];
    for (var i = 0; i < Config.OpponentValues.length; i++) {
        for (var j = 0; j < grid.tiles.length; j++) {
            if (grid.value(j) === 0) {
                var clone = grid.clone();
                clone.add(j, Config.OpponentValues[i]);
                moves.push(clone);
            }
        }
    }
    return moves;
};

SearchTree.prototype.playerMoves = function(grid) {
    var moves = [];
    var directions = Direction.all();
    for (var i = 0; i < directions.length; i++) {
        var clone = grid.clone();
        var points = clone.slide(directions[i]);
        if (points !== null) {
            moves.push({
                direction: directions[i],
                grid: clone
            });
        }
    }
    return moves;
};

SearchTree.prototype.minimax = function(grid, depth, playerTurn, alpha, beta) {
    var i, result;
    var bestDirection = null;
    if (grid.max() === 11 || depth === 0) {
        return {
            score: this.evaluate(grid),
            direction: bestDirection
        };
    }

    if (playerTurn) {
        var playerMoves = this.playerMoves(grid);
        for (i = 0; i < playerMoves.length; i++) {
            result = this.minimax(playerMoves[i].grid, depth - 1, !playerTurn, alpha, beta);
            if (result.score > alpha) {
                alpha = result.score;
                bestDirection = playerMoves[i].direction;
            }
            if (alpha >= beta) {
                break;
            }
        }
        return {
            score: alpha,
            direction: bestDirection
        };
    } else {
        var opponentMoves = this.opponentMoves(grid);
        for (i = 0; i < opponentMoves.length; i++) {
            result = this.minimax(opponentMoves[i], depth - 1, !playerTurn, alpha, beta);
            if (result.score < beta) {
                beta = result.score;
            }
            if (alpha >= beta) {
                break;
            }
        }
        return {
            score: beta,
            direction: bestDirection
        };
    }
};

module.exports = SearchTree;