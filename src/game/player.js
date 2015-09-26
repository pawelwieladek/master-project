var Game = require("./game");

function Player() { }

Player.prototype.defaultDidMoveFunction = function() { };

Player.prototype.evaluateBestDirection = function() {
    throw new Error("evaluateMaxAction not implemented");
};

Player.prototype.getDidMoveFunction = function(callback) {
    return function(state, direction, reward, afterState, finalState) {
        this.defaultDidMoveFunction.call(this, state, direction, reward, afterState, finalState);
        callback = callback || function() { };
        callback.call(this, state, direction, reward, afterState, finalState);
    }.bind(this);
};

Player.prototype.next = function(game, limit, playerDidMove) {
    game.next(this.evaluateBestDirection.bind(this), this.getDidMoveFunction(playerDidMove), limit);
    return game;
};

Player.prototype.play = function(playerDidMove) {
    var game = new Game();
    game.play(this.evaluateBestDirection.bind(this), this.getDidMoveFunction(playerDidMove));
    return game;
};

module.exports = Player;