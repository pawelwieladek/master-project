import Registry from '../../common/registry';
import { createPlayerAction, learnAction, notifyLearnProgressAction } from '../../actions/learn-actions';

let handlers = app => {

    let createPlayerHandler = (send, player) => {
        app.setState({ player });
        send(player.game.grid.tiles);
    };

    app.register(createPlayerAction, Registry.withHandler(createPlayerAction, createPlayerHandler).build());

    let learnHandler = (send) => {
        send();
    };

    let notifyLearnProgressHandler = (send, iteration) => {
        send(iteration);
    };

    app.register(learnAction, Registry.withHandler(learnAction, learnHandler).withHandler(notifyLearnProgressAction, notifyLearnProgressHandler).build());
};

export default handlers;