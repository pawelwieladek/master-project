var inherits = require("util").inherits;
var Game = require("./game");
var Search = require("../heuristics/search");

function SearchTreeGame() {
    Game.apply(this);
}

inherits(SearchTreeGame, Game);

SearchTreeGame.prototype.evaluateDirection = function() {
    return Search.search(this.grid).direction;
};

module.exports = SearchTreeGame;