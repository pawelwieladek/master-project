import { createPlayer, play, progress } from "../../actions/search-actions";
import SearchPlayer from "../../../src/ai/search/search-player";

let handlers = registry => {

    registry.register(createPlayer, send => {
        send(createPlayer, SearchPlayer.createPlayer());
    });

    registry.register(play, (send, context) => {
        let player = SearchPlayer.deserialize(context.state.player);
        let game = player.play((state, direction, reward, afterState, finalState) => {
            send(progress, finalState);
        });
        send(play, game);
    });
};

export default handlers;