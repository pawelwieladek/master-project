var childRegistry = require("./child-registry");

function createMessage(action, response) {
    return {
        action: action,
        response: response
    };
}

process.on('message', function(context) {
    try {
        var handler = childRegistry.getHandler(context.action);
        var send = function(action, response) {
            process.send(createMessage(action, response));
        };
        handler(send, context);
    } catch (e) {
        console.warn(e);
    }
});