var _ = require("lodash");

var Game = require("../game/game");
var Parameters = require("../../config").Config.Parameters;
var SearchTree = require("../search/search");

function SearchTreePlayer(params) {
    params = params || {};
    this.depth = params.depth || Parameters.Search.Depth.Default;
    this.monotonicity = params.monotonicity || Parameters.Search.Monotonicity.Default;
    this.smoothness = params.smoothness || Parameters.Search.Smoothness.Default;
    this.availability = params.availability || Parameters.Search.Availability.Default;
    this.maximization = params.maximization || Parameters.Search.Maximization.Default;
    this.searchTree = new SearchTree(this.depth, this.monotonicity, this.smoothness, this.availability, this.maximization);
}

SearchTreePlayer.createParamsObject = function(depth, monotonicity, smoothness, availability, maximization) {
    return {
        depth: depth,
        monotonicity: monotonicity,
        smoothness: smoothness,
        availability: availability,
        maximization: maximization
    }
};

SearchTreePlayer.prototype.getParams = function() {
    return SearchTreePlayer.createParamsObject(this.depth, this.monotonicity, this.smoothness, this.availability, this.maximization);
};

SearchTreePlayer.prototype.evaluateMaxAction = function(grid) {
    return this.searchTree.search(grid).direction;
};

SearchTreePlayer.prototype.play = function(onMoved) {
    onMoved = onMoved || _.noop;
    var game = new Game();
    game.play(this.evaluateMaxAction.bind(this), onMoved);
    return game;
};

module.exports = SearchTreePlayer;
