var Config = require("../../config");
var LearnPlayer = require("../players/learn-player");
var SearchPlayer = require("../players/search-player");

function App(gameType) {
    this.player = App.GetPlayer(gameType);
}

App.GetPlayer = function(gameType) {
    switch(gameType) {
        case Config.GameTypes.Learn:
            return new LearnPlayer();
        case Config.GameTypes.Search:
            return new SearchPlayer();
        default:
            throw new Error("Player not defined or not recognized");
    }
};

App.prototype.play = function(limit, onProgress, onMove) {
    var player = this.player;
    var start = new Date();
    var promise = Config.PromiseLoop(function(count) { return count < limit; }, function(count) {
        return player.play(count, onMove)
            .then(function() { onProgress(count + 1, limit); })
            .then(function() { return ++count; });
    }, 0);
    return promise.then(function() {
        return { start: start, end: new Date() }
    });
};

module.exports = App;