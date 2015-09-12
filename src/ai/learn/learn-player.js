var _ = require("lodash");

var Parameters = require("../../../config").Config.Parameters;
var Utils = require("../../../config").Utils;
var Game = require("../../game/game");
var Rules = require("../../game/rules");
var Player = require("../../game/player");
var Direction = require("../../game/direction");
var TupleNetwork = require("./tuple-network/tuple-network");

function LearnPlayer(params) {
    params = params || {};
    this.learningRate = params.learningRate || Parameters.Learn.LearningRate.Default;
    this.tupleNetwork = new TupleNetwork(4);
    Player.call(this);
}

Utils.extend(Player, LearnPlayer);

LearnPlayer.createPlayer = function(params) {
    return new LearnPlayer(params);
};

LearnPlayer.deserialize = function(serialized) {
    var player = new LearnPlayer();
    player.game = Game.deserialize(serialized.game);
    player.learningRate = serialized.learningRate;
    player.tupleNetwork = TupleNetwork.deserialize(serialized.tupleNetwork);
    return player;
};

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

LearnPlayer.prototype.defaultMoveCallback = function(state, direction, reward, afterState, finalState) {
    var nextDirection = this.evaluateMaxAction(finalState);
    if (nextDirection === null) return null;
    var nextResult = Rules.computeAfterState(finalState, nextDirection);
    this.updateLearningEvaluation(afterState, nextResult.afterState, nextResult.reward);
};

LearnPlayer.prototype.evaluateDirection = function(grid, direction) {
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
