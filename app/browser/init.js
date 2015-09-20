var App = require("./main").App;
var handlers = require("./main").handlers;

var main = new App({
    dirname: __dirname,
    width: 1000,
    height: 640,
    title: '2048 AI App'
});

main.use(handlers);
main.run();