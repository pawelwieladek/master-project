var _ = require("lodash");
var stdio = require("stdio");
var options = stdio.getopt({
    "games": {
        key: "g",
        args: 1,
        description: "number of games",
        "default": 1
    },
    "depth": {
        key: "d",
        args: "*",
        description: "depth",
        "default": "1"
    },
    "monotonicity": {
        key: "m",
        args: "*",
        description: "monotonicity",
        "default": "1"
    },
    "smoothness": {
        key: "s",
        args: "*",
        description: "smoothness",
        "default": "1"
    },
    "availability": {
        key: "a",
        args: "*",
        description: "availability",
        "default": "1"
    },
    "maximization": {
        key: "x",
        args: "*",
        description: "maximization",
        "default": "1"
    }
});

var Config = require("../../config").Config;
var Utils = require("../../config").Utils;
var App = require("../../src/game/app");
var SearchPlayer = require("../../src/players/search-player");

var start = new Date();
var app = new App(Config.GameTypes.Search);
var depth = _.isArray(options.depth) ? options.depth : [options.depth];
var monotonicity = _.isArray(options.monotonicity) ? options.monotonicity : [options.monotonicity];
var smoothness = _.isArray(options.smoothness) ? options.smoothness : [options.smoothness];
var availability = _.isArray(options.availability) ? options.availability : [options.availability];
var maximization = _.isArray(options.maximization) ? options.maximization : [options.maximization];
var paramsArray = _.map(Utils.cartesianProduct(depth, monotonicity, smoothness, availability, maximization), function(params) {
    return SearchPlayer.createParamsObject.apply(null, params);
});

app.multiplePlayers()
    .withParamsArray(paramsArray)
    .withPlayerDoneCallback(Utils.OnPlayerDoneCallback)
    .withGameDoneCallback(Utils.OnGameDoneCallback)
    .run(options.games)
    .then(Utils.getRunSummary(app, start))
    .catch(Utils.getErrorLog());