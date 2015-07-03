var Config = require("../config");
var App = require("../src/game/app");

var app = new App(Config.GameTypes.Search);
console.log("Search app");
app.play(100, Config.ConsoleProgress).then(function(times) {
    console.log("Start: " + times.start);
    console.log("End: " + times.end);
    console.log("Done.");
});