var chance = require("chance").Chance(new Date());

var Grid = require("../core/grid");

function Game() {
    this.winnerTileValue = 11;
    this.iterations = 0;
    this.score = 0;
    this.grid = new Grid();
}

Game.prototype.getScore = function() {
    return this.score;
};

Game.prototype.getIterations = function() {
    return this.iterations;
};

Game.prototype.isWinnerState = function() {
    return this.grid.max() === this.winnerTileValue;
};

Game.prototype.addRandomTile = function(grid) {
    var finalState = grid.clone();
    var value = chance.integer({ min: 1, max: 10 }) <= 9 ? 1 : 2;
    var index = chance.pick(finalState.available());
    finalState.add(index, value);
    return finalState;
};

Game.prototype.opponentTurn = function() {
    this.grid = this.addRandomTile(this.grid);
};

Game.prototype.initialize = function() {
    this.opponentTurn();
    this.opponentTurn();
};

Game.prototype.play = function() {
    this.initialize();
    while (!this.isWinnerState()) {
        var direction = this.evaluateDirection();
        if (direction === null) return false;

        var result = this.move(this.grid, direction);
        if (result === null) return false;

        this.onMoved(direction, result.reward, result.afterState, result.finalState);

        this.score += result.reward;
        this.grid = result.finalState;
    }
    return true;
};

Game.prototype.evaluateDirection = function() { };

Game.prototype.onMoved = function(direction, reward, afterState, finalState) { };

Game.prototype.computeAfterState = function(grid, direction) {
    var afterState = grid.clone();
    var points = afterState.slide(direction);
    return points !== null ? { reward: points, afterState: afterState } : null;
};

Game.prototype.move = function(grid, direction) {
    var result = this.computeAfterState(grid, direction);
    if (result === null) return null;
    var finalState = this.addRandomTile(result.afterState);
    return { reward: result.reward, afterState: result.afterState, finalState: finalState }
};

module.exports = Game;