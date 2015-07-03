var Config = require("../config");
var App = require("../src/game/app");

var app = new App(Config.GameTypes.Search);

app.play(100, Config.ConsoleProgress2).then(function() {
    console.log("\nDone!");
});