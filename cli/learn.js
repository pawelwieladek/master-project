var LearnPlayer = require("../src/ai/learn/learn-player");
var player = new LearnPlayer();
var iterations = 1000;
var wins = 0;
for (var i = 0; i < iterations; i++) {
    var game = player.play();
    if (game.grid.max() === 11) {
        wins += 1;
    }
}
console.log(wins, iterations);