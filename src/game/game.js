var Grid = require("./grid");
var Rules = require("./rules");

function Game() {
    this.movesNumber = 0;
    this.score = 0;
    this.grid = Rules.getInitialState();
}

Game.deserialize = function(serialized) {
    var game = new Game();
    game.movesNumber = serialized.movesNumber;
    game.score = serialized.score;
    game.grid = new Grid(serialized.grid.tiles);
    return game;
};

Game.prototype.isWin = function() {
    return this.grid.max() === Rules.winValue;
};

Game.prototype.move = function(evaluateDirectionFunction, didMoveFunction) {
    var state = this.grid;

    var direction = evaluateDirectionFunction(state);
    if (direction === null) return false;

    var result = Rules.move(state, direction);
    if (result === null) return false;

    didMoveFunction(state, direction, result.reward, result.afterState, result.finalState);

    this.movesNumber++;
    this.score += result.reward;
    this.grid = result.finalState;

    return true;
};

Game.prototype.next = function(evaluateDirectionFunction, didMoveFunction, limit) {
    var i = 0;
    var result = true;
    while (result && !this.isWin() && i < limit) {
        result = this.move(evaluateDirectionFunction, didMoveFunction);
        i++;
    }
};

Game.prototype.play = function(evaluateDirectionFunction, didMoveFunction) {
    var result = true;
    while (result && !this.isWin()) {
        result = this.move(evaluateDirectionFunction, didMoveFunction);
    }
};

module.exports = Game;
