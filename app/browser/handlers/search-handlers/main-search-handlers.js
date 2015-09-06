import Registry from '../../common/registry';
import { createPlayer, playGame, notifyProgress } from '../../actions/search-actions';

let handlers = app => {

    let createPlayerHandler = (send, player) => {
        app.setState({ player });
        send(player.game.grid.tiles);
    };

    app.register(createPlayer, Registry.withHandler(createPlayer, createPlayerHandler).build());

    let playGameHandler = (send, game) => {
        send(game);
    };

    let notifyProgressHandler = (send, grid) => {
        send(grid.tiles);
    };

    app.register(playGame, Registry.withHandler(playGame, playGameHandler).withHandler(notifyProgress, notifyProgressHandler).build());
};

export default handlers;