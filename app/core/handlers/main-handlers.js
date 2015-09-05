var Registry = require("../common/registry");
var SearchActions = require("../../actions/search-actions");

let handlers = app => {

    let createHandler = (send, player) => {
        app.setState({ player });
        send(player.game.grid.tiles);
    };

    app.register(SearchActions.createPlayer, Registry.withHandler(SearchActions.createPlayer, createHandler).build());

    let playHandler = (send, game) => {
        send(game.grid.tiles);
    };

    let progressHandler = (send, grid) => {
        send(grid.tiles);
    };

    app.register(SearchActions.play, Registry.withHandler(SearchActions.play, playHandler).withHandler(SearchActions.progress, progressHandler).build());
};

export default handlers;