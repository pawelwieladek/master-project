import { createPlayerAction, learnAction, notifyLearnProgressAction } from '../../actions/learn-actions';
import LearnPlayer from '../../../../src/ai/learn/learn-player';
import { List } from 'immutable';

let handlers = registry => {

    registry.register(createPlayerAction, send => {
        send(createPlayerAction, LearnPlayer.createPlayer());
    });

    registry.register(learnAction, (send, context) => {
        let player = LearnPlayer.deserialize(context.state.player);
        let iterationsNumber = context.args[0];
        for (let iteration = 0; iteration < iterationsNumber; iteration++) {
            player.reset();
            let game = player.play();
            let isWin = List(game.grid.tiles).max() === 11;
            send(notifyLearnProgressAction, { iteration, isWin });
        }
        send(learnAction);
    });
};

export default handlers;