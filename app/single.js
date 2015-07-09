var Config = require("../config").Config;
var Utils = require("../config").Utils;
var App = require("../src/game/app");

var start = new Date();
var app = new App(Config.GameTypes.Learn);

app.single()
    .withMoveDoneCallback(Utils.OnMoveDoneCallback)
    .run()
    .then(function() {
        var end = new Date();
        console.log("Start: " + start);
        console.log("End: " + end);
        console.log("Done.");
    })
    .catch(function(err) { console.log(err); });