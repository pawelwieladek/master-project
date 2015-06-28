var _ = require("lodash");

var Game = require("./game");
var Search = require("../heuristics/search");

function SearchTreePlayer() {
  this.game = new Game();
}

SearchTreePlayer.prototype.evaluateDirection = function(grid) {
    return Search.search(grid).direction;
};

SearchTreePlayer.prototype.play = function(onMoved) {
    onMoved = onMoved || _.noop;
    return this.game.play(this.evaluateDirection, onMoved);
};

module.exports = SearchTreePlayer;
