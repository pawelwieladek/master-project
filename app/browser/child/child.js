import registry from "./child-registry";

let createMessage = (intent, response) => {
    return {
        intent: intent,
        response: response
    };
};

process.on('message', message => {
    let handler = registry.getHandler(message.intent);
    let send = (intent, response) => {
        process.send(createMessage(intent, response));
    };
    handler(send, message);
});