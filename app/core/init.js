var App = require("./main").App;
var handlers = require("./main").handlers;

var main = new App({
    dirname: __dirname
});

main.use(handlers);
main.run();