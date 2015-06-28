var SearchTreeGame = require("../src/game/search-tree-game");

var i;
var iterations = 20;
var passes = 0;
var failures = 0;
for (i = 1; i <= iterations; i++) {
    var game = new SearchTreeGame();
    var result = game.play();
    if (result === false) {
        failures++;
        console.warn("\n" + i + "/" + iterations + ": Failed");
    } else {
        passes++;
        console.log("\n" + i + "/" + iterations + ": Passed");
    }
}
console.log("Winning rate: " + passes / (passes + failures));
