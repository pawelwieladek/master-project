var SearchTreeGame = require("../src/game/search-tree-game");
var game = new SearchTreeGame();
game.onMoved = function(direction, reward, afterState, finalState) {
    console.log(finalState.toString());
    console.log("---");
};
var result = game.play();
console.log(result ? "Success" : "Failure");
console.log("Score: " + game.getScore());
