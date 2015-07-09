var LearnPlayer = require("../players/learn-player");
var SearchPlayer = require("../players/search-player");
var Config = require("../../config").Config;
var Parameters = Config.Parameters;

var PlayerFactory = {
    getDefaultParams: function(gameType) {
        switch(gameType) {
            case Config.GameTypes.Learn:
                return {
                    learningRate: Parameters.Learn.LearningRate.Default
                };
            case Config.GameTypes.Search:
                return {
                    depth: Parameters.Search.Depth.Default,
                    monotonicity: Parameters.Search.Monotonicity.Default,
                    smoothness: Parameters.Search.Smoothness.Default,
                    availability: Parameters.Search.Availability.Default,
                    maximization: Parameters.Search.Maximization.Default
                };
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
    },
    getParams: function(gameType) {
        var params = [];
        switch(gameType) {
            case Config.GameTypes.Learn:
                Parameters.Learn.LearningRate.Range.forEach(function(learningRate) {
                    params.push(LearnPlayer.createParamsObject(learningRate));
                });
                return params;
            case Config.GameTypes.Search:
                Parameters.Search.Depth.Range.forEach(function(depth) {
                    Parameters.Search.Monotonicity.Range.forEach(function(monotonicity) {
                        Parameters.Search.Smoothness.Range.forEach(function(smoothness) {
                            Parameters.Search.Availability.Range.forEach(function(availability) {
                                Parameters.Search.Maximization.Range.forEach(function(maximization) {
                                    params.push(SearchPlayer.createParamsObject(depth, monotonicity, smoothness, availability, maximization));
                                });
                            });
                        });
                    });
                });
                return params;
            default:
                throw new Error("Player not defined or not recognized");
        }
    }
};

module.exports = PlayerFactory;