var _ = require("lodash");
var ReinforcementLearningPlayer = require("../src/game/reinforcement-learning-player");

var i;
var numberOfGames = 50000;
var player = new ReinforcementLearningPlayer();

for (i = 1; i <= numberOfGames; i++) {
    player.play();
    if (i % 100 === 0 ) process.stdout.write(".");
    if (i % 1000 === 0 ) process.stdout.write("\n");
}
console.log("\n");
console.log("Win coefficient: " + player.recorder.getWinCoefficient());
console.log(_.map(player.recorder.results, function(result) { return result.grid.max(); }).join(", "));
