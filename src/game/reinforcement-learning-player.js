var _ = require("lodash");

var Game = require("./game").Game;
var GameStatics = require("./game").GameStatics;
var Direction = require("../core/direction");
var ResultRecorder = require("./result-recorder");
var TupleNetwork = require("../reinforcement/tuple-network");

function ReinforcementLearningPlayer() {
    this.tupleNetwork = new TupleNetwork();
    this.recorder = new ResultRecorder();
    this.learningRate = 0.01;
}

ReinforcementLearningPlayer.prototype.evaluateMaxAction = function(grid) {
    var i;
    var maxEvaluation = -Infinity;
    var maxAction = null;
    for (i = 0; i < Direction.all().length; i++) {
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

ReinforcementLearningPlayer.prototype.evaluateDirection = function(grid, direction) {
    var result = GameStatics.computeAfterState(grid, direction);
    if (result === null) return null;
    return result.reward + this.tupleNetwork.getNetworkValue(result.afterState);
};

ReinforcementLearningPlayer.prototype.learnEvaluation = function(state, direction, reward, afterState, finalState) {
    var nextDirection = this.evaluateMaxAction(finalState);
    if (nextDirection === null) return null;
    var nextResult = GameStatics.computeAfterState(finalState, nextDirection);
    this.updateLearningEvaluation(afterState, nextResult.afterState, nextResult.reward);
};

ReinforcementLearningPlayer.prototype.updateLearningEvaluation = function(initialState, finalState, reward) {
    var initialValue = this.tupleNetwork.getNetworkValue(initialState);
    var finalValue = this.tupleNetwork.getNetworkValue(finalState);
    var change = this.learningRate * (reward + finalValue - initialValue);
    this.tupleNetwork.changeWeights(initialState, change);
};

ReinforcementLearningPlayer.prototype.play = function() {
    var game = new Game();
    var win = game.play(this.evaluateMaxAction.bind(this), this.learnEvaluation.bind(this));
    this.recorder.record(new Date(), win, game);
};

module.exports = ReinforcementLearningPlayer;
