import childHandlers from '../handlers/child-handlers.js';

let handlers = registry => {
    childHandlers.forEach(handler => handler(registry));
};

export default handlers;