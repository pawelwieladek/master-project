var _ = require("lodash");

var Game = require("./game").Game;
var ResultRecorder = require("./result-recorder");
var Search = require("../heuristics/search");

function SearchTreePlayer() {
    this.recorder = new ResultRecorder();
}

SearchTreePlayer.prototype.evaluateMaxAction = function(grid) {
    return Search.search(grid).direction;
};

SearchTreePlayer.prototype.play = function(onMoved) {
    onMoved = onMoved || _.noop;
    var game = new Game();
    var win = game.play(this.evaluateMaxAction.bind(this), onMoved);
    this.recorder.record(new Date(), win, game);
};

module.exports = SearchTreePlayer;
