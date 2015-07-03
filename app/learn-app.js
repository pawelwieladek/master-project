var Config = require("../config");
var App = require("../src/game/app");

var app = new App(Config.GameTypes.Learn);

app.play(10000, Config.ConsoleProgress).then(function() {
    console.log("\nDone!");
});