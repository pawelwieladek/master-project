var Promise = require("bluebird");

var Config = {
    Db: {
        ConnectionString: "mongodb://localhost/masters"
    },
    GameTypes: {
        Learn: "learn",
        Search: "search"
    },
    Parameters: {
        Search: {
            Depth: {
                Range: [4, 5, 6],
                Default: 5
            },
            Monotonicity: {
                Range: [1, 2, 3, 4],
                Default: 2
            },
            Smoothness: {
                Range: [1, 2, 3, 4],
                Default: 1
            },
            Availability: {
                Range: [1, 2, 3, 4],
                Default: 4
            },
            Maximization: {
                Range: [1, 2, 3, 4],
                Default: 3
            }
        },
        Learn: {
            LearningRate: {
                Range: [1, 0.1, 0.01, 0.001],
                Default: 0.01
            }
        }
    }
};
var Utils = {
    PromiseLoop: Promise.method(function(condition, action, value) {
        if (!condition(value)) return value;
        return action(value).then(Utils.PromiseLoop.bind(null, condition, action));
    }),
    OnMoveDoneCallback: function(state, direction, reward, afterState, finalState) {
        process.stdout.write("\n" + finalState.toString() + "\n");
    },
    OnGameDoneCallback: function(gameCounter, total) {
        process.stdout.write("Game progress: " + Math.round(100 * (100 * gameCounter) / total) / 100 + "%\r");
    },
    OnPlayerDoneCallback: function(playerCounter, total) {
        process.stdout.write("Player progress: " + Math.round(100 * (100 * playerCounter) / total) / 100 + "%\r");
    }
};

module.exports.Config = Config;
module.exports.Utils = Utils;
