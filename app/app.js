var Game = require("../src/core/game");

var i;
var iterations = 20;
var passes = 0;
var failures = 0;
for (i = 1; i <= iterations; i++) {
    var game = new Game();
    var result = game.run();
    if (result === false) {
        failures++;
        console.warn("\n" + i + "/" + iterations + ": Failed");
    } else {
        passes++;
        console.log("\n" + i + "/" + iterations + ": Passed");
    }
}
console.log("Winning rate: " + passes / (passes + failures));
