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
        args: 1,
        description: "depth",
        "default": 1
    },
    "monotonicity": {
        key: "m",
        args: 1,
        description: "monotonicity",
        "default": 1
    },
    "smoothness": {
        key: "s",
        args: 1,
        description: "smoothness",
        "default": 1
    },
    "availability": {
        key: "a",
        args: 1,
        description: "availability",
        "default": 1
    },
    "maximization": {
        key: "x",
        args: 1,
        description: "maximization",
        "default": 1
    }
});

var Config = require("../../../../config").Config;
var Utils = require("../../../../config").Utils;
var App = require("../../../game/app");
var SearchPlayer = require("../../../ai/search/search-player");

var start = new Date();
var app = new App(Config.GameTypes.Search);
var params = new SearchPlayer.createParamsObject(options.depth, options.monotonicity, options.smoothness, options.availability, options.maximization);

app.multipleGames()
    .withParams(params)
    .withGameDoneCallback(Utils.OnGameDoneCallback)
    .run(options.games)
    .then(Utils.getRunSummary(app, start))
    .catch(Utils.getErrorLog());