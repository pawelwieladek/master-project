var Config = require("../config");
var App = require("../src/game/app");

console.log("Learn app");

var gamesNumber = 100000;
var app = new App(Config.GameTypes.Learn);
app.play(gamesNumber, Config.ConsoleProgress)
    .then(function(times) {
        console.log("Start: " + times.start);
        console.log("End: " + times.end);
        console.log("Done.");
    })
    .catch(function(err) { throw err; });