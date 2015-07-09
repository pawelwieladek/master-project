var _ = require("lodash");
var Utils = require("../../config").Utils;
var ResultRecorder = require("./result-recorder");
var PlayerFactory = require("./player-factory");

function App(gameType) {
    this.gameType = gameType;
    this.resultRecorder = new ResultRecorder(this.gameType, new Date());
}

// TODO: reorder arguments
App.prototype.record = function(counter, game, params) {
    return this.resultRecorder.record(counter, game.isWin(), game, params);
};

App.prototype.research = function() {
    return new ResearchRunBuilder(this);
};

App.prototype.multiple = function() {
    return new MultipleRunBuilder(this);
};

App.prototype.single = function() {
    return new SingleRunBuilder(this);
};

function SingleRunBuilder(app) {
    this.app = app;
    this.counter = null;
    this.player = null;
    this.moveDoneCallback = null;
}

SingleRunBuilder.prototype.withCounter = function(counter) {
    this.counter = counter;
    return this;
};

SingleRunBuilder.prototype.withPlayer = function(player) {
    this.player = player;
    return this;
};

SingleRunBuilder.prototype.withMoveDoneCallback = function(moveDoneCallback) {
    this.moveDoneCallback = moveDoneCallback;
    return this;
};

SingleRunBuilder.prototype.run = function() {
    var counter = this.counter || 0;
    var player = this.player || PlayerFactory.getPlayerOrDefault(this.app.gameType);
    var params = player.getParams();
    var moveDoneCallback = this.moveDoneCallback || _.noop;
    var game = player.play(moveDoneCallback);
    return this.app.record(counter, game, params);
};

function MultipleRunBuilder(app) {
    this.app = app;
    this.params = null;
    this.moveDoneCallback = null;
    this.gameDoneCallback = null;
}

MultipleRunBuilder.prototype.withParams = function(params) {
    this.params = params;
    return this;
};

MultipleRunBuilder.prototype.withMoveDoneCallback = function(moveDoneCallback) {
    this.moveDoneCallback = moveDoneCallback;
    return this;
};

MultipleRunBuilder.prototype.withGameDoneCallback = function(gameDoneCallback) {
    this.gameDoneCallback = gameDoneCallback;
    return this;
};

MultipleRunBuilder.prototype.run = function(gamesNumber) {
    gamesNumber = gamesNumber || 1;
    var player = PlayerFactory.getPlayerOrDefault(this.app.gameType, this.params);
    var gameDoneCallback = this.gameDoneCallback || _.noop;

    var singleRunBuilder = new SingleRunBuilder(this.app);
    singleRunBuilder.withPlayer(player);
    if (this.moveDoneCallback) singleRunBuilder.withMoveDoneCallback(this.moveDoneCallback);

    return Utils.PromiseLoop(function(counter) { return counter < gamesNumber; }, function(counter) {
        return singleRunBuilder.withCounter(counter).run()
            .then(function() { gameDoneCallback(counter + 1, gamesNumber); })
            .then(function() { return ++counter; })
            .catch(function(err) { console.log(err); });
    }, 0);
};

function ResearchRunBuilder(app) {
    this.app = app;
    this.moveDoneCallback = null;
    this.gameDoneCallback = null;
    this.playerDoneCallback = null;
}

ResearchRunBuilder.prototype.withMoveDoneCallback = function(moveDoneCallback) {
    this.moveDoneCallback = moveDoneCallback;
    return this;
};

ResearchRunBuilder.prototype.withGameDoneCallback = function(gameDoneCallback) {
    this.gameDoneCallback = gameDoneCallback;
    return this;
};

ResearchRunBuilder.prototype.withPlayerDoneCallback = function(playerDoneCallback) {
    this.playerDoneCallback = playerDoneCallback;
    return this;
};

ResearchRunBuilder.prototype.run = function(gamesNumber) {
    var params = PlayerFactory.getParams(this.app.gameType);
    var playerDoneCallback = this.playerDoneCallback || _.noop;

    var multipleRunBuilder = new MultipleRunBuilder(this.app);
    if (this.moveDoneCallback) multipleRunBuilder.withMoveDoneCallback(this.moveDoneCallback);
    if (this.gameDoneCallback) multipleRunBuilder.withGameDoneCallback(this.gameDoneCallback);

    return Utils.PromiseLoop(function(counter) { return counter < params.length }, function(counter) {
        return multipleRunBuilder.withParams(params[counter]).run(gamesNumber)
            .then(function() { playerDoneCallback(counter + 1, params.length); })
            .then(function() { return ++counter; })
            .catch(function(err) { console.log(err); });
    }, 0);
};

module.exports = App;