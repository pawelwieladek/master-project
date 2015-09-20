import { createPlayerIntent, playGameIntent, notifyProgressIntent } from '../../intents/search-intents';
import SearchPlayer from '../../../../src/ai/search/search-player';

let handlers = registry => {

    registry.register(createPlayerIntent, (send, context) => {
        let params = context.args[0];
        let player = SearchPlayer.createPlayer(params);
        send(createPlayerIntent, player);
    });

    registry.register(playGameIntent, (send, context) => {
        let player = SearchPlayer.deserialize(context.state.player);
        let game = player.play((state, direction, reward, afterState, finalState) => {
            send(notifyProgressIntent, finalState);
        });
        send(playGameIntent, game);
    });
};

export default handlers;