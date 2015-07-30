var _ = require("lodash");
var Utils = require("../../config").Utils;
var ResultRecorder = require("./result-recorder");

function App(playerFactory, resultRecorder) {
    this.playerFactory = playerFactory;
    this.resultRecorder = resultRecorder;
}

App.prototype.record = function(counter, game, params) {
    return this.resultRecorder.record(counter, game.isWin(), game, params);
};

App.prototype.end = function() {
    return this.resultRecorder.end();
};

App.prototype.multiplePlayers = function() {
    return new MultiplePlayersRunBuilder(this);
};

App.prototype.multipleGames = function() {
    return new MultipleGamesRunBuilder(this);
};

App.prototype.singleGame = function() {
    return new SingleGameRunBuilder(this);
};

function SingleGameRunBuilder(app) {
    this.app = app;
    this.counter = null;
    this.player = null;
    this.moveDoneCallback = null;
}

SingleGameRunBuilder.prototype.withCounter = function(counter) {
    this.counter = counter;
    return this;
};

SingleGameRunBuilder.prototype.withPlayer = function(player) {
    this.player = player;
    return this;
};

SingleGameRunBuilder.prototype.withMoveDoneCallback = function(moveDoneCallback) {
    this.moveDoneCallback = moveDoneCallback;
    return this;
};

SingleGameRunBuilder.prototype.run = function() {
    var counter = this.counter || 0;
    var player = this.player || PlayerFactory.getPlayerOrDefault(this.app.gameType);
    var params = player.getParams();
    var moveDoneCallback = this.moveDoneCallback || _.noop;
    var game = player.play(moveDoneCallback);
    return this.app.record(counter, game, params);
};

function MultipleGamesRunBuilder(app) {
    this.app = app;
    this.params = null;
    this.moveDoneCallback = null;
    this.gameDoneCallback = null;
}

MultipleGamesRunBuilder.prototype.withParams = function(params) {
    this.params = params;
    return this;
};

MultipleGamesRunBuilder.prototype.withMoveDoneCallback = function(moveDoneCallback) {
    this.moveDoneCallback = moveDoneCallback;
    return this;
};

MultipleGamesRunBuilder.prototype.withGameDoneCallback = function(gameDoneCallback) {
    this.gameDoneCallback = gameDoneCallback;
    return this;
};

MultipleGamesRunBuilder.prototype.run = function(gamesNumber) {
    gamesNumber = gamesNumber || 1;
    var player = PlayerFactory.getPlayerOrDefault(this.app.gameType, this.params);
    var gameDoneCallback = this.gameDoneCallback || _.noop;

    var singleRunBuilder = new SingleGameRunBuilder(this.app);
    singleRunBuilder.withPlayer(player);
    if (this.moveDoneCallback) singleRunBuilder.withMoveDoneCallback(this.moveDoneCallback);

    return Utils.PromiseLoop(function(counter) { return counter < gamesNumber; }, function(counter) {
        return singleRunBuilder.withCounter(counter).run()
            .then(function() { gameDoneCallback(counter + 1, gamesNumber); })
            .then(function() { return ++counter; })
            .catch(function(err) { console.log(err); });
    }, 0);
};

function MultiplePlayersRunBuilder(app) {
    this.app = app;
    this.paramsArray = null;
    this.moveDoneCallback = null;
    this.gameDoneCallback = null;
    this.playerDoneCallback = null;
}

MultiplePlayersRunBuilder.prototype.withParamsArray = function(paramsArray) {
    this.paramsArray = paramsArray;
    return this;
};

MultiplePlayersRunBuilder.prototype.withMoveDoneCallback = function(moveDoneCallback) {
    this.moveDoneCallback = moveDoneCallback;
    return this;
};

MultiplePlayersRunBuilder.prototype.withGameDoneCallback = function(gameDoneCallback) {
    this.gameDoneCallback = gameDoneCallback;
    return this;
};

MultiplePlayersRunBuilder.prototype.withPlayerDoneCallback = function(playerDoneCallback) {
    this.playerDoneCallback = playerDoneCallback;
    return this;
};

MultiplePlayersRunBuilder.prototype.run = function(gamesNumber) {
    var playerDoneCallback = this.playerDoneCallback || _.noop;
    var paramsArray = this.paramsArray || [];

    var multipleRunBuilder = new MultipleGamesRunBuilder(this.app);
    if (this.moveDoneCallback) multipleRunBuilder.withMoveDoneCallback(this.moveDoneCallback);
    if (this.gameDoneCallback) multipleRunBuilder.withGameDoneCallback(this.gameDoneCallback);

    return Utils.PromiseLoop(function(counter) { return counter < paramsArray.length }, function(counter) {
        return multipleRunBuilder.withParams(paramsArray[counter]).run(gamesNumber)
            .then(function() { playerDoneCallback(counter + 1, paramsArray.length); })
            .then(function() { return ++counter; })
            .catch(function(err) { console.log(err); });
    }, 0);
};

module.exports = App;