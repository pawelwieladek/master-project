var stdio = require("stdio");
var options = stdio.getopt({
    "type": {
        key: "t",
        args: 1,
        description: "Game mode [learn|search]",
        mandatory: true
    },
    "run": {
        key: "r",
        args: 1,
        description: "Run mode [research|multiple|single]",
        mandatory: true
    },
    "games": {
        key: "n",
        args: 1,
        description: "Number of games",
        "default": 1
    }
});

var Config = require("../config").Config;
var Utils = require("../config").Utils;
var App = require("../src/game/app");

var start = new Date();
var gameType;
switch (options.type) {
    case "learn":
        gameType = Config.GameTypes.Learn;
        break;
    case "search":
        gameType = Config.GameTypes.Search;
        break;
    default:
        throw new Error("Unrecognized game type");
}
var app = new App(gameType);
var builder;
switch (options.run) {
    case "research":
        builder = app.research().withPlayerDoneCallback(Utils.OnPlayerDoneCallback);
        if (gameType === Config.GameTypes.Learn) {
            builder = builder.withGameDoneCallback(Utils.OnGameDoneCallback);
        }
        break;
    case "multiple":
        builder = app.multiple()
            .withGameDoneCallback(Utils.OnGameDoneCallback);
        break;
    case "single":
        builder = app.single()
            .withMoveDoneCallback(Utils.OnMoveDoneCallback);
        break;
    default:
        throw new Error("Unrecognized run mode");
}

builder.run(options.run !== "single" ? options.games : null)
    .then(function() {
        var end = new Date();
        console.log("Start: " + start);
        console.log("End: " + end);
        console.log("Done.");
    })
    .catch(function(err) { console.log(err); });
