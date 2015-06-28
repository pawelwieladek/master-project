var chance = require("chance").Chance(new Date());

var Grid = require("../core/grid");

var GameStatics = {
    WinValue: 11,
    addRandomTile: function(grid) {
        var finalState = grid.clone();
        var value = chance.integer({ min: 1, max: 10 }) <= 9 ? 1 : 2;
        var index = chance.pick(finalState.available());
        finalState.add(index, value);
        return finalState;
    },
    computeAfterState: function(grid, direction) {
        var afterState = grid.clone();
        var points = afterState.slide(direction);
        if (points === null) return null;
        return { reward: points, afterState: afterState };
    },
    move: function(grid, direction) {
        var result = GameStatics.computeAfterState(grid, direction);
        if (result === null) return null;
        var finalState = GameStatics.addRandomTile(result.afterState);
        return { reward: result.reward, afterState: result.afterState, finalState: finalState };
    }
};

function Game() {
    this.movesNumber = 0;
    this.score = 0;
    this.grid = new Grid();
}

Game.prototype.isWinnerState = function() {
    return this.grid.max() === GameStatics.WinValue;
};

Game.prototype.opponentTurn = function() {
    this.grid = GameStatics.addRandomTile(this.grid);
};

Game.prototype.initialize = function() {
    this.opponentTurn();
    this.opponentTurn();
};

Game.prototype.play = function(directionEvaluator, onMoved) {
    this.initialize();
    while (!this.isWinnerState()) {
        var state = this.grid;

        var direction = directionEvaluator(state);
        if (direction === null) return false;

        var result = GameStatics.move(state, direction);
        if (result === null) return false;

        onMoved(state, direction, result.reward, result.afterState, result.finalState);

        this.movesNumber++;
        this.score += result.reward;
        this.grid = result.finalState;
    }
    return true;
};

module.exports.Game = Game;
module.exports.GameStatics = GameStatics;
