var App = require("./main").App;
var Handlers = require("./main").Handlers;

var main = new App({
    dirname: __dirname
});

main.use(Handlers);
main.run();