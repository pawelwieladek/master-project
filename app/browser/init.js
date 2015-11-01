var App = require("./main").App;
var handlers = require("./main").handlers;

var main = new App({
    dirname: __dirname,
    width: 1024,
    height: 640
});

main.use(handlers);
main.run();