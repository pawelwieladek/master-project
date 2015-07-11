var stdio = require("stdio");
var options = stdio.getopt({
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

var Config = require("../../config").Config;
var Utils = require("../../config").Utils;
var App = require("../../src/game/app");
var SearchPlayer = require("../../src/players/search-player");
var PlayerFactory = require("../../src/game/player-factory");

var gameType = Config.GameTypes.Search;
var start = new Date();
var app = new App(gameType);
var params = new SearchPlayer.createParamsObject(options.depth, options.monotonicity, options.smoothness, options.availability, options.maximization);
var player = PlayerFactory.getPlayerOrDefault(gameType, params);

app.singleGame()
    .withPlayer(player)
    .withMoveDoneCallback(Utils.OnMoveDoneCallback)
    .run()
    .then(Utils.getRunSummary(app, start))
    .catch(Utils.getErrorLog());