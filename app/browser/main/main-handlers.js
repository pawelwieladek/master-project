import mainHandlers from '../handlers/main-handlers.js';

let handlers = registry => {
    mainHandlers.forEach(handler => handler(registry));
};

export default handlers;