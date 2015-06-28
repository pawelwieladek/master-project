var _ = require("lodash");

function Result(date, win, grid, score, moves) {
    this.date = date;
    this.win = win;
    this.grid = grid;
    this.score = score;
    this.moves = moves;
}

function ResultRecorder() {
    this.results = [];
}

ResultRecorder.prototype.record = function(date, win, game) {
    this.results.push(new Result(date, win, game.grid, game.score, game.movesNumber));
};

ResultRecorder.prototype.last = function() {
    return this.results[this.results.length - 1];
};

ResultRecorder.prototype.getWinCoefficient = function() {
    return _.sum(this.results, function(result) { return result.win === true ? 1 : 0 }) / this.results.length;
};

module.exports = ResultRecorder;