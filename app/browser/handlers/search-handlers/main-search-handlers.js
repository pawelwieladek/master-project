import Registry from '../../common/registry';
import SearchIntents from '../../intents/search-intents';

let handlers = app => {

    let createPlayerHandler = (send, player) => {
        app.setState({ player });
        send();
    };

    app.register(
        SearchIntents.createPlayerIntent,
        Registry
            .withHandler(SearchIntents.createPlayerIntent, createPlayerHandler)
            .build()
    );

    let playGameHandler = (send, game) => {
        send(game);
    };

    let notifyProgressHandler = (send, grid) => {
        send(grid.tiles);
    };

    app.register(
        SearchIntents.singleGame.playIntent,
        Registry
            .withHandler(SearchIntents.singleGame.playIntent, playGameHandler)
            .withHandler(SearchIntents.singleGame.notifyIntent, notifyProgressHandler)
            .build()
    );
};

export default handlers;