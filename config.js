var Promise = require("bluebird");

var Config = {
    Db: {
        ConnectionString: "mongodb://localhost/masters"
    },
    GameTypes: {
        Learn: "learn",
        Search: "search"
    },
    PromiseLoop: Promise.method(function(condition, action, value) {
        if (!condition(value)) return value;
        return action(value).then(Config.PromiseLoop.bind(null, condition, action));
    }),
    ConsoleProgress: function(count, total) {
        process.stdout.write("Progress: " + Math.round(100 * (100 * count) / total) / 100 + "%\r");
    }
};

module.exports = Config;