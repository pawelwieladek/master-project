var ElectronApp = require("./electron-app");
var Registry = require("./registry");
var SearchActions = require("./search-actions");

var main = new ElectronApp({
    dirname: __dirname
});

main.register(SearchActions.createPlayer, Registry.createRegistry(SearchActions.createPlayer, function(send, player) {
    this.setState({
        player: player
    });
    send(player.game.grid.tiles);
}));

var playRegistry = new Registry();
playRegistry.register(SearchActions.play, function(send, game) {
    send(game.grid.tiles);
});
playRegistry.register(SearchActions.progress, function(send, grid) {
    send(grid.tiles);
});

main.register(SearchActions.play, playRegistry);

main.run();