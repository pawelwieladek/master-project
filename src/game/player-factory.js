var LearnPlayer = require("../players/learn-player");
var SearchPlayer = require("../players/search-player");
var Config = require("../../config").Config;
var Parameters = Config.Parameters;

var PlayerFactory = {
    getDefaultParams: function(gameType) {
        switch(gameType) {
            case Config.GameTypes.Learn:
                return LearnPlayer.createParamsObject(Parameters.Learn.LearningRate.Default);
            case Config.GameTypes.Search:
                return SearchPlayer.createParamsObject(Parameters.Search.Depth.Default, Parameters.Search.Monotonicity.Default, Parameters.Search.Smoothness.Default, Parameters.Search.Availability.Default, Parameters.Search.Maximization.Default);
            default:
                throw new Error("Game type not recognized");
        }
    },
    getPlayerOrDefault: function(gameType, params) {
        switch(gameType) {
            case Config.GameTypes.Learn:
                return new LearnPlayer(params || PlayerFactory.getDefaultParams(gameType));
            case Config.GameTypes.Search:
                return new SearchPlayer(params || PlayerFactory.getDefaultParams(gameType));
            default:
                throw new Error("Player not defined or not recognized");
        }
    }
};

module.exports = PlayerFactory;