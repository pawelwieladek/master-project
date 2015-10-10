import SearchIntents from '../../intents/search-intents';
import SearchPlayer from '../../../../src/ai/search/search-player';

let handlers = registry => {

    registry.register(SearchIntents.createPlayerIntent, (send, context) => {
        let params = context.args[0];
        let player = new SearchPlayer({ searchTree: params} );
        send(SearchIntents.createPlayerIntent, player);
    });

    registry.register(SearchIntents.singleGame.playIntent, (send, context) => {
        let player = new SearchPlayer(context.state.player);
        let game = player.play((state, direction, reward, afterState, finalState) => {
            send(SearchIntents.singleGame.notifyIntent, finalState);
        });
        send(SearchIntents.singleGame.playIntent, game);
    });

    registry.register(SearchIntents.multipleGames.playIntent, (send, context) => {
        let player = new SearchPlayer(context.state.player);
        let gamesNumber = context.args[0];
        for (let i = 0; i < gamesNumber; i++) {
            let game = player.play();
            send(SearchIntents.multipleGames.notifyIntent, game);
        }
        send(SearchIntents.multipleGames.playIntent);
    });
};

export default handlers;