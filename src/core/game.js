var chance = require("chance").Chance(new Date());

var Grid = require("./grid");
var Search = require("../heuristics/search");

function Game() {
    this.grid = new Grid();
}

Game.prototype.opponentTurn = function() {
    var value = chance.integer({ min: 1, max: 10 }) <= 9 ? 1 : 2;
    var index = chance.pick(this.grid.available());
    this.grid.add(index, value);
};

Game.prototype.playerTurn = function() {
    var direction = Search.search(this.grid).move;
    if (direction === null) return false;

    var points = this.grid.slide(direction);
    if (points === null) return false;

    return points;
};

Game.prototype.run = function() {
    var iterations = 0;
    var points = 0;
    this.opponentTurn();
    this.opponentTurn();
    while (true) {
        var result = this.playerTurn();
        if (result === false) return false;
        points += result;
        if (this.grid.max() === 11) return points;
        this.opponentTurn();
        if (iterations++ % 100 === 0) process.stdout.write(".");
    }
};

module.exports = Game;