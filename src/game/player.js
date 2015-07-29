var Game = require("./game");

function Player() {
    this.game = new Game();
}

Player.prototype.reset = function() {
    this.game = new Game();
};

Player.prototype.defaultMoveCallback = function() { };

Player.prototype.evaluateMaxAction = function() {
    throw new Error("evaluateMaxAction not implemented");
};

Player.prototype.getMoveCallback = function(callback) {
    return function(state, direction, reward, afterState, finalState) {
        this.defaultMoveCallback.call(this, state, direction, reward, afterState, finalState);
        callback = callback || function() { };
        callback.call(this, state, direction, reward, afterState, finalState);
    }.bind(this);
};

Player.prototype.next = function(limit, callback) {
    this.game.next(this.evaluateMaxAction.bind(this), this.getMoveCallback(callback), limit);
    return this.game;
};

Player.prototype.play = function(callback) {
    this.game.play(this.evaluateMaxAction.bind(this), this.getMoveCallback(callback));
    return this.game;
};