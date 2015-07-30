var _ = require("lodash");

var Player = require("../../game/player");
var Utils = require("../../../config").Utils;
var Parameters = require("../../../config").Config.Parameters;
var SearchTree = require("./search-tree");

function SearchPlayer(params) {
    params = params || {};
    var depth = params.depth || Parameters.Search.Depth.Default;
    var monotonicity = params.monotonicity || Parameters.Search.Monotonicity.Default;
    var smoothness = params.smoothness || Parameters.Search.Smoothness.Default;
    var availability = params.availability || Parameters.Search.Availability.Default;
    var maximization = params.maximization || Parameters.Search.Maximization.Default;
    this.searchTree = new SearchTree(depth, monotonicity, smoothness, availability, maximization);
}

Utils.extend(Player, SearchPlayer);

SearchPlayer.create = function(params) {
    return new SearchPlayer(params);
};

SearchPlayer.prototype.evaluateMaxAction = function(grid) {
    return this.searchTree.search(grid).direction;
};

module.exports = SearchPlayer;
