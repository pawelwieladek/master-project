var inherits = require("util").inherits;
var Game = require("./game");
var TupleNetwork = require("../reinforcement/tuple-network");

function ReinforcementLearningGame() {
    Game.apply(this);
}

inherits(ReinforcementLearningGame, Game);

ReinforcementLearningGame.prototype.evaluateDirection = function() {
    return null;
};

module.exports = ReinforcementLearningGame;
