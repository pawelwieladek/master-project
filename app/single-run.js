var SearchTreePlayer = require("../src/game/search-tree-player");

var player = new SearchTreePlayer();

var onMoved = function(state, direction, reward, afterState, finalState) {
    console.log("Reward: " + reward);
    console.log(finalState.toString());
    console.log("---");
};

var result = player.play(onMoved);

console.log(result ? "Success" : "Failure");
console.log("Score: " + player.recorder.last().score);
