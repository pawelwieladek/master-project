import { createPlayerIntent, learnIntent, notifyLearnProgressIntent } from '../../intents/learn-intents';
import LearnPlayer from '../../../../src/ai/learn/learn-player';
import { List } from 'immutable';

let handlers = registry => {

    registry.register(createPlayerIntent, send => {
        send(createPlayerIntent, LearnPlayer.createPlayer());
    });

    registry.register(learnIntent, (send, context) => {
        let player = LearnPlayer.deserialize(context.state.player);
        let iterationsNumber = context.args[0];
        for (let iteration = 0; iteration < iterationsNumber; iteration++) {
            let game = player.play();
            let isWin = List(game.grid.tiles).max() === 11;
            send(notifyLearnProgressIntent, isWin);
        }
        send(learnIntent);
    });
};

export default handlers;