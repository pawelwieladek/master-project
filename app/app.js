var SearchTreePlayer = require("../src/game/search-tree-player");

var i, j;
var numberOfIterations = 100;
var numberOfGames = 20;
var passes = 0;
var failures = 0;

var onMoved = function() {
    if (j++ % numberOfIterations === 0) process.stdout.write(".");
};

for (i = 1; i <= numberOfGames; i++) {
    j = 0;
    var player = new SearchTreePlayer();
    var result = player.play(onMoved);
    if (result === false) {
        failures++;
        console.warn("\n" + i + "/" + numberOfGames + ": Failed");
    } else {
        passes++;
        console.log("\n" + i + "/" + numberOfGames + ": Passed");
    }
}
console.log("Winning rate: " + passes / (passes + failures));
