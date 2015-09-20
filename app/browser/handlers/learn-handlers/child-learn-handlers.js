import LearnIntents from '../../intents/learn-intents';
import LearnPlayer from '../../../../src/ai/learn/learn-player';
import { List } from 'immutable';

let handlers = registry => {

    registry.register(LearnIntents.createPlayerIntent, send => {
        send(LearnIntents.createPlayerIntent, LearnPlayer.createPlayer());
    });

    registry.register(LearnIntents.learnIntent, (send, context) => {
        let player = LearnPlayer.deserialize(context.state.player);
        let iterationsNumber = context.args[0];
        for (let iteration = 0; iteration < iterationsNumber; iteration++) {
            let game = player.play();
            let isWin = List(game.grid.tiles).max() === 11;
            send(LearnIntents.notifyLearnProgressIntent, isWin);
        }
        send(LearnIntents.learnIntent);
    });

    registry.register(LearnIntents.playGameIntent, (send, context) => {
        let player = LearnPlayer.deserialize(context.state.player);
        player.learningEnabled = false;
        let game = player.play((state, direction, reward, afterState, finalState) => {
            send(LearnIntents.notifyGameProgressIntent, finalState);
        });
        send(LearnIntents.playGameIntent, game);
    });
};

export default handlers;