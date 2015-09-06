import { createPlayer, playGame, notifyProgress } from '../../actions/search-actions';
import SearchPlayer from '../../../../src/ai/search/search-player';

let handlers = registry => {

    registry.register(createPlayer, send => {
        send(createPlayer, SearchPlayer.createPlayer());
    });

    registry.register(playGame, (send, context) => {
        let player = SearchPlayer.deserialize(context.state.player);
        let game = player.play((state, direction, reward, afterState, finalState) => {
            send(notifyProgress, finalState);
        });
        send(playGame, game);
    });
};

export default handlers;