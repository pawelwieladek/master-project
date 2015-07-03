var _ = require("lodash");

var Config = require("../../config");
var Game = require("../game/game");
var ResultRecorder = require("../game/result-recorder");
var Search = require("../search/search");

function SearchTreePlayer() {
    this.resultsRecorder = new ResultRecorder(Config.GameTypes.Search);
}

SearchTreePlayer.prototype.evaluateMaxAction = function(grid) {
    return Search.search(grid).direction;
};

SearchTreePlayer.prototype.play = function(counter, onMoved) {
    onMoved = onMoved || _.noop;
    var game = new Game();
    var win = game.play(this.evaluateMaxAction.bind(this), onMoved);
    return this.resultsRecorder.record(counter, win, game);
};

module.exports = SearchTreePlayer;
