var Config = require("../config").Config;
var Utils = require("../config").Utils;
var App = require("../src/game/app");

var gamesNumber = 200000;
var start = new Date();
var app = new App(Config.GameTypes.Search);

app.research()
    .withPlayerDoneCallback(Utils.OnPlayerDoneCallback)
    .withGameDoneCallback(Utils.OnGameDoneCallback)
    .run(gamesNumber)
    .then(function() {
        var end = new Date();
        console.log("Start: " + start);
        console.log("End: " + end);
        console.log("Done.");
    })
    .catch(function(err) { console.log(err); });