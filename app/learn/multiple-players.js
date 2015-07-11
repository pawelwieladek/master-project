var _ = require("lodash");
var stdio = require("stdio");
var options = stdio.getopt({
    "games": {
        key: "g",
        args: 1,
        description: "number of games",
        "default": 1
    },
    "learningRate": {
        key: "l",
        args: "*",
        description: "learning rate",
        "default": "0.01"
    }
});

var Config = require("../../config").Config;
var Utils = require("../../config").Utils;
var App = require("../../src/game/app");
var LearnPlayer = require("../../src/players/learn-player");

var start = new Date();
var app = new App(Config.GameTypes.Learn);
var learningRates = _.isArray(options.learningRate) ? options.learningRate : [options.learningRate];
var paramsArray = _.map(learningRates, function(learningRate) {
    return LearnPlayer.createParamsObject(learningRate);
});

app.multiplePlayers()
    .withParamsArray(paramsArray)
    .withPlayerDoneCallback(Utils.OnPlayerDoneCallback)
    .withGameDoneCallback(Utils.OnGameDoneCallback)
    .run(options.games)
    .then(Utils.getRunSummary(app, start))
    .catch(Utils.getErrorLog());