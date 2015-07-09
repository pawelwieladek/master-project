var _ = require("lodash");
var mongoose = require("mongoose");
var Promise = require("bluebird");
var moment = require("moment");

var Config = require("../../config").Config;

Promise.promisifyAll(mongoose);

var ResultSchema = mongoose.Schema({
    date: Date,
    parameters: Object,
    counter: Number,
    win: Boolean,
    tiles: Array,
    score: Number,
    moves: Number
});

function ResultRecorder(gameType, timestamp) {
    var collectionName = _.template("<%= type %>_<%= datetime %>")({
        type: gameType,
        datetime: moment(timestamp).format("YYYY_MM_DD_HH_mm_SS")
    });
    this.model = mongoose.model(collectionName, ResultSchema);
}

ResultRecorder.prototype.getDate = function() {
    return new Date();
};

ResultRecorder.prototype.record = function(counter, win, game, parameters) {
    var Result = this.model;
    var date = this.getDate();
    return new Promise(function(resolve, reject) {
        mongoose.connect(Config.Db.ConnectionString);

        var result = new Result({
            date: date,
            parameters: parameters,
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