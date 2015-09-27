import SearchIntents from '../../intents/search-intents';
import SearchPlayer from '../../../../src/ai/search/search-player';

let handlers = registry => {

    registry.register(SearchIntents.createPlayerIntent, (send, context) => {
        let params = context.args[0];
        let player = new SearchPlayer({ searchTree: params} );
        send(createPlayerIntent, player);
        send(SearchIntents.createPlayerIntent, player);
    });

    registry.register(SearchIntents.singleGame.playIntent, (send, context) => {
        let player = new SearchPlayer(context.state.player);
        let game = player.play((state, direction, reward, afterState, finalState) => {
            send(SearchIntents.singleGame.notifyIntent, finalState);
        });
        send(SearchIntents.singleGame.playIntent, game);
    });
};

export default handlers;