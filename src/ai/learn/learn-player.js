var _ = require("lodash");

var Defaults = require("../../../config/config").Defaults;
var Utils = require("../../../config/utils");
var Rules = require("../../game/rules");
var Player = require("../../game/player");
var Direction = require("../../game/direction");
var TupleNetwork = require("./tuple-network/tuple-network");

function LearnPlayer(params) {
    params = params || {};
    this.learningEnabled = params.learningEnabled || true;
    this.learningRate = params.learningRate || Defaults.Learn.LearningRate;
    this.tupleNetwork = params.tupleNetwork ? new TupleNetwork(params.tupleNetwork) : new TupleNetwork();
    Player.call(this);
}

Utils.extend(Player, LearnPlayer);

LearnPlayer.prototype.evaluateBestDirection = function(grid) {
    var maxEvaluation = -Infinity;
    var maxAction = null;
    for (var i = 0; i < Direction.all().length; i++) {
        var direction = Direction.all()[i];
        var currentEvaluation = this.evaluateSingleDirection(grid, direction);
        if (currentEvaluation === null) continue;
        if (currentEvaluation > maxEvaluation) {
            maxEvaluation = currentEvaluation;
            maxAction = direction;
        }
    }
    return maxAction;
};

LearnPlayer.prototype.defaultDidMoveFunction = function(state, direction, reward, afterState, finalState) {
    if (this.learningEnabled) {
        var nextDirection = this.evaluateBestDirection(finalState);
        if (nextDirection === null) return;
        var nextResult = Rules.computeAfterState(finalState, nextDirection);
        this.updateLearningEvaluation(afterState, nextResult.afterState, nextResult.reward);
    }
};

LearnPlayer.prototype.evaluateSingleDirection = function(grid, direction) {
    var result = Rules.computeAfterState(grid, direction);
    if (result === null) return null;
    return result.reward + this.tupleNetwork.getNetworkValue(result.afterState);
};

LearnPlayer.prototype.updateLearningEvaluation = function(initialState, finalState, reward) {
    var initialValue = this.tupleNetwork.getNetworkValue(initialState);
    var finalValue = this.tupleNetwork.getNetworkValue(finalState);
    var change = this.learningRate * (reward + finalValue - initialValue);
    this.tupleNetwork.changeWeights(initialState, change);
};

module.exports = LearnPlayer;
