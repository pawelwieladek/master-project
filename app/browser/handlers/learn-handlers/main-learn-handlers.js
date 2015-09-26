import Registry from '../../common/registry';
import LearnIntents from '../../intents/learn-intents';

let handlers = app => {

    let createPlayerHandler = (send, player) => {
        app.setState({ player });
        send();
    };

    app.register(
        LearnIntents.createPlayerIntent,
        Registry.withHandler(LearnIntents.createPlayerIntent, createPlayerHandler)
            .build()
    );

    let learnHandler = (send, player) => {
        app.setState({ player });
        send();
    };

    let notifyLearnProgressHandler = (send, isWin) => {
        send(isWin);
    };

    app.register(
        LearnIntents.learnIntent,
        Registry.withHandler(LearnIntents.learnIntent, learnHandler)
            .withHandler(LearnIntents.notifyLearnProgressIntent, notifyLearnProgressHandler)
            .build()
    );

    let playGameHandler = (send, game) => {
        send(game);
    };

    let notifyGameProgressHandler = (send, grid) => {
        send(grid.tiles);
    };

    app.register(
        LearnIntents.playGameIntent,
        Registry
            .withHandler(LearnIntents.playGameIntent, playGameHandler)
            .withHandler(LearnIntents.notifyGameProgressIntent, notifyGameProgressHandler)
            .build()
    );
};

export default handlers;