var Config = require("../config");
var App = require("../src/game/app");

console.log("Search app");

var gamesNumber = 100;
var app = new App(Config.GameTypes.Search);
app.play(gamesNumber, Config.ConsoleProgress)
    .then(function(times) {
        console.log("Start: " + times.start);
        console.log("End: " + times.end);
        console.log("Done.");
    })
    .catch(function(err) { throw err; });