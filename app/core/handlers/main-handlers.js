var Registry = require("../common/registry");
var SearchActions = require("../../actions/search-actions");

let handlers = app => {

    app.register(SearchActions.createPlayer, Registry.withHandler(SearchActions.createPlayer, (send, player) => {
        app.setState({ player });
        send(player.game.grid.tiles);
    }).build());

    app.register(SearchActions.play, Registry.withHandler(SearchActions.play, (send, game) => {
        send(game.grid.tiles);
    }).withHandler(SearchActions.progress, (send, grid) => {
        send(grid.tiles);
    }).build());
};

export default handlers;