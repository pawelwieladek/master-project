var _ = require("lodash");
var mongoose = require("mongoose");
var Promise = require("bluebird");
var moment = require("moment");

var Config = require("../../config");

Promise.promisifyAll(mongoose);

var ResultSchema = mongoose.Schema({
    date: Date,
    counter: Number,
    win: Boolean,
    tiles: Array,
    score: Number,
    moves: Number
});

function ResultRecorder(gameType) {
    var collectionTemplate = _.template("<%= type %>_<%= datetime %>");
    var collectionName = collectionTemplate({
        type: gameType,
        datetime: moment().format("YYYY_MM_DD_HH_mm")
    });
    this.model = mongoose.model(collectionName, ResultSchema);
}

ResultRecorder.prototype.getDate = function() {
    return new Date();
};

ResultRecorder.prototype.record = function(counter, win, game) {
    var Result = this.model;
    var date = this.getDate();
    return new Promise(function(resolve, reject) {
        mongoose.connect(Config.Db.ConnectionString);

        var result = new Result({
            date: date,
            win: win,
            counter: counter,
            tiles: game.grid.tiles,
            score: game.score,
            moves: game.movesNumber
        });

        result.saveAsync()
            .then(function() {
                mongoose.connection.close();
                resolve();
            })
            .catch(function(err) {
                reject(err);
            });
    });
};

module.exports = ResultRecorder;