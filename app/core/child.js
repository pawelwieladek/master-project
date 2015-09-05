var childRegistry = require("./child-registry");

function createMessage(action, response) {
    return {
        action: action,
        response: response
    };
}

process.on('message', function(message) {
    console.log('child received message', message);
    try {
        var handler = childRegistry.getHandler(message.action);
        var send = function(action, response) {
            console.log('child send action', response);
            process.send(createMessage(action, response));
        };
        console.log('child will handle', message.action);
        handler(send, message);
        console.log('child did handle', message.action);
    } catch (e) {
        console.warn(e);
    }
});