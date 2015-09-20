import Registry from '../../common/registry';
import { createPlayerIntent, learnIntent, notifyLearnProgressIntent } from '../../intents/learn-intents';

let handlers = app => {

    let createPlayerHandler = (send, player) => {
        app.setState({ player });
        send();
    };

    app.register(createPlayerIntent, Registry.withHandler(createPlayerIntent, createPlayerHandler).build());

    let learnHandler = (send) => {
        send();
    };

    let notifyLearnProgressHandler = (send, isWin) => {
        send(isWin);
    };

    app.register(learnIntent, Registry.withHandler(learnIntent, learnHandler).withHandler(notifyLearnProgressIntent, notifyLearnProgressHandler).build());
};

export default handlers;