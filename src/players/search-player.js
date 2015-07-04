var _ = require("lodash");

var Config = require("../../config");
var Game = require("../game/game");
var ResultRecorder = require("../game/result-recorder");
var SearchTree = require("../search/search");

function SearchTreePlayer() {
    var depth = 5;
    this.searchTree = new SearchTree({
        monotonicity: 1.0,
        smoothness: 0.5,
        availability: 3.0,
        maximization: 1.5
    }, depth);
    this.resultsRecorder = new ResultRecorder(Config.GameTypes.Search);
}

SearchTreePlayer.prototype.evaluateMaxAction = function(grid) {
    return this.searchTree.search(grid).direction;
};

SearchTreePlayer.prototype.play = function(counter, onMoved) {
    onMoved = onMoved || _.noop;
    var game = new Game();
    var win = game.play(this.evaluateMaxAction.bind(this), onMoved);
    return this.resultsRecorder.record(counter, win, game);
};

module.exports = SearchTreePlayer;
