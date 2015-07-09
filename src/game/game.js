var chance = require("chance").Chance(new Date());

var Grid = require("../core/grid");

function Game() {
    this.movesNumber = 0;
    this.score = 0;
    this.grid = new Grid();
}

Game.WinValue = 11;

Game.addRandomTile = function(grid) {
    var finalState = grid.clone();
    var value = chance.integer({ min: 1, max: 10 }) <= 9 ? 1 : 2;
    var index = chance.pick(finalState.available());
    finalState.add(index, value);
    return finalState;
};

Game.computeAfterState = function(grid, direction) {
    var afterState = grid.clone();
    var points = afterState.slide(direction);
    if (points === null) return null;
    return { reward: points, afterState: afterState };
};

Game.move = function(grid, direction) {
    var result = Game.computeAfterState(grid, direction);
    if (result === null) return null;
    var finalState = Game.addRandomTile(result.afterState);
    return { reward: result.reward, afterState: result.afterState, finalState: finalState };
};

Game.prototype.isWin = function() {
    return this.grid.max() === Game.WinValue;
};

Game.prototype.opponentTurn = function() {
    this.grid = Game.addRandomTile(this.grid);
};

Game.prototype.initialize = function() {
    this.opponentTurn();
    this.opponentTurn();
};

Game.prototype.play = function(directionEvaluator, onMoved) {
    this.initialize();
    while (!this.isWin()) {
        var state = this.grid;

        var direction = directionEvaluator(state);
        if (direction === null) return;

        var result = Game.move(state, direction);
        if (result === null) return;

        onMoved(state, direction, result.reward, result.afterState, result.finalState);

        this.movesNumber++;
        this.score += result.reward;
        this.grid = result.finalState;
    }
};

module.exports = Game;
