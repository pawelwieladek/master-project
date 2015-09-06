import ipc from 'ipc';

let communicationMixin = {
    listenTo(action, handler) {
        ipc.on(action, handler);
    },
    trigger(action, ...args) {
        ipc.send(action, ...args);
    }
};

export default communicationMixin;