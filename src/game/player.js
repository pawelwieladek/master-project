var Game = require("./game");

function Player() {
    this.game = new Game();
}

Player.prototype.reset = function() {
    this.game = new Game();
};