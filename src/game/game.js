var Grid = require("./grid");
var Rules = require("./rules");

function Game() {
    this.movesNumber = 0;
    this.score = 0;
    this.grid = Rules.getInitialState();
}

Game.prototype.isWin = function() {
    return this.grid.max() === Rules.winValue;
};

Game.prototype.move = function(directionEvaluator, callback) {
    var state = this.grid;

    var direction = directionEvaluator(state);
    if (direction === null) return false;

    var result = Rules.move(state, direction);
    if (result === null) return false;

    callback(state, direction, result.reward, result.afterState, result.finalState);

    this.movesNumber++;
    this.score += result.reward;
    this.grid = result.finalState;

    return true;
};

Game.prototype.next = function(directionEvaluator, callback, limit) {
    var i = 0;
    var result = true;
    while (result || !this.isWin() || i < limit) {
        result = this.move(directionEvaluator, callback);
        i++;
    }
};

Game.prototype.play = function(directionEvaluator, callback) {
    var result = true;
    while (result || !this.isWin()) {
        result = this.move(directionEvaluator, callback);
    }
};

module.exports = Game;
