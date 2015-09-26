var _ = require("lodash");

var Player = require("../../game/player");
var Utils = require("../../../config/utils");
var SearchTree = require("./search-tree");

function SearchPlayer(params) {
    params = params || {};
    this.searchTree = new SearchTree(params.searchTree);
    Player.call(this);
}

Utils.extend(Player, SearchPlayer);

SearchPlayer.prototype.evaluateBestDirection = function(grid) {
    return this.searchTree.search(grid).direction;
};

module.exports = SearchPlayer;
