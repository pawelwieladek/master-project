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
    ConsoleProgress: function(count) {
        if (count % 1000 === 0 ) process.stdout.write("\n");
        else if (count % 100 === 0 ) process.stdout.write(":");
        else if (count % 10 === 0 ) process.stdout.write(".");
    },
    ConsoleProgress2: function(count) {
        if (count % 100 === 0 ) process.stdout.write("\n");
        else if (count % 10 === 0 ) process.stdout.write(":");
        else process.stdout.write(".");
    }
};

module.exports = Config;