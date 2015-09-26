import Registry from '../../common/registry';
import { createPlayerIntent, playGameIntent, notifyProgressIntent } from '../../intents/search-intents';

let handlers = app => {

    let createPlayerHandler = (send, player) => {
        app.setState({ player });
        send();
    };

    app.register(
        createPlayerIntent,
        Registry
            .withHandler(createPlayerIntent, createPlayerHandler)
            .build()
    );

    let playGameHandler = (send, game) => {
        send(game);
    };

    let notifyProgressHandler = (send, grid) => {
        send(grid.tiles);
    };

    app.register(
        playGameIntent,
        Registry
            .withHandler(playGameIntent, playGameHandler)
            .withHandler(notifyProgressIntent, notifyProgressHandler)
            .build()
    );
};

export default handlers;