import Registry from '../../common/registry';
import SearchIntents from '../../intents/search-intents';

let handlers = app => {

    app.register(
        SearchIntents.createPlayerIntent,
        Registry
            .withHandler(SearchIntents.createPlayerIntent, (send, player) => {
                app.setState({ player });
                send();
            })
            .build()
    );

    app.register(
        SearchIntents.singleGame.playIntent,
        Registry
            .withHandler(SearchIntents.singleGame.playIntent, (send, game) => {
                send(game);
            })
            .withHandler(SearchIntents.singleGame.notifyIntent, (send, grid) => {
                send(grid.tiles);
            })
            .build()
    );

    app.register(
        SearchIntents.multipleGames.playIntent,
        Registry
            .withHandler(SearchIntents.multipleGames.playIntent, (send) => {
                send();
            })
            .withHandler(SearchIntents.multipleGames.notifyIntent, (send, game) => {
                send(game.grid.tiles);
            })
            .build()
    );
};

export default handlers;