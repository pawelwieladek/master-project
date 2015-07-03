var Config = require("../../config");
var Game = require("../game/game");
var Direction = require("../core/direction");
var ResultRecorder = require("../game/result-recorder");
var TupleNetwork = require("../learn/tuple-network");

function LearnPlayer() {
    this.resultsRecorder = new ResultRecorder(Config.GameTypes.Learn);
    this.tupleNetwork = new TupleNetwork(4);
    this.learningRate = 0.01;
}

LearnPlayer.prototype.evaluateMaxAction = function(grid) {
    var maxEvaluation = -Infinity;
    var maxAction = null;
    for (var i = 0; i < Direction.all().length; i++) {
        var direction = Direction.all()[i];
        var currentEvaluation = this.evaluateDirection(grid, direction);
        if (currentEvaluation === null) continue;
        if (currentEvaluation > maxEvaluation) {
            maxEvaluation = currentEvaluation;
            maxAction = direction;
        }
    }
    return maxAction;
};

LearnPlayer.prototype.evaluateDirection = function(grid, direction) {
    var result = Game.computeAfterState(grid, direction);
    if (result === null) return null;
    return result.reward + this.tupleNetwork.getNetworkValue(result.afterState);
};

LearnPlayer.prototype.learnEvaluation = function(state, direction, reward, afterState, finalState) {
    var nextDirection = this.evaluateMaxAction(finalState);
    if (nextDirection === null) return null;
    var nextResult = Game.computeAfterState(finalState, nextDirection);
    this.updateLearningEvaluation(afterState, nextResult.afterState, nextResult.reward);
};

LearnPlayer.prototype.updateLearningEvaluation = function(initialState, finalState, reward) {
    var initialValue = this.tupleNetwork.getNetworkValue(initialState);
    var finalValue = this.tupleNetwork.getNetworkValue(finalState);
    var change = this.learningRate * (reward + finalValue - initialValue);
    this.tupleNetwork.changeWeights(initialState, change);
};

LearnPlayer.prototype.play = function(counter) {
    var game = new Game();
    var win = game.play(this.evaluateMaxAction.bind(this), this.learnEvaluation.bind(this));
    return this.resultsRecorder.record(counter, win, game);
};

module.exports = LearnPlayer;
