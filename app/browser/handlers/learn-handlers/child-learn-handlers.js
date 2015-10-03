import LearnIntents from '../../intents/learn-intents';
import LearnPlayer from '../../../../src/ai/learn/learn-player';
import { List } from 'immutable';

let handlers = registry => {

    registry.register(LearnIntents.createPlayerIntent, (send, context) => {
        var learningRate = context.args[0];
        send(LearnIntents.createPlayerIntent, new LearnPlayer({ learningRate }));
    });

    registry.register(LearnIntents.learnIntent, (send, context) => {
        let player = new LearnPlayer(context.state.player);
        let iterationsNumber = context.args[0];
        for (let iteration = 0; iteration < iterationsNumber; iteration++) {
            let game = player.play();
            let isWin = List(game.grid.tiles).max() === 11;
            send(LearnIntents.notifyLearnProgressIntent, isWin);
        }
        send(LearnIntents.learnIntent, player);
    });

    registry.register(LearnIntents.playSingleGameIntent, (send, context) => {
        let player = new LearnPlayer(context.state.player);
        player.learningEnabled = false;
        let game = player.play((state, direction, reward, afterState, finalState) => {
            send(LearnIntents.notifySingleGameProgressIntent, finalState);
        });
        send(LearnIntents.playSingleGameIntent, game);
    });
};

export default handlers;