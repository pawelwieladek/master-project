var _ = require("lodash");
var Promise = require("bluebird");

var Config = {
    Db: {
        ConnectionString: "mongodb://localhost/masters_tmp"
    },
    GameTypes: {
        Learn: "learn",
        Search: "search"
    },
    Parameters: {
        Search: {
            Depth: {
                Range: [3, 4, 5, 6],
                Default: 3
            },
            Monotonicity: {
                Range: [1, 2, 3, 4],
                Default: 4
            },
            Smoothness: {
                Range: [1, 2, 3, 4],
                Default: 4
            },
            Availability: {
                Range: [1, 2, 3, 4],
                Default: 3
            },
            Maximization: {
                Range: [1, 2, 3, 4],
                Default: 2
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
    extend: function(parentClass, childClass) {
        var C = function() { };
        C.prototype = parentClass.prototype;
        childClass.prototype = new C();
        childClass.prototype.constructor = childClass;
    },
    cartesianProduct: function() {
        function addTo(curr, args) {

            var i, copy,
                rest = args.slice(1),
                last = !rest.length,
                result = [];

            for (i = 0; i < args[0].length; i++) {
                copy = curr.slice();
                copy.push(args[0][i]);

                if (last) {
                    result.push(copy);

                } else {
                    result = result.concat(addTo(copy, rest));
                }
            }
            return result;
        }
        return addTo([], Array.prototype.slice.call(arguments));
    },
    getRunSummary: function(app, start) {
        return function() {
            var end = new Date();
            console.log("Start: " + start);
            console.log("End: " + end);
            console.log("Done.");
            app.end();
        }
    },
    getErrorLog: function() {
        return function(err) {
            console.log(err);
        }
    },
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
