var _ = require("lodash");

function Registry() {
    this.handlers = {};
}

Registry.createRegistry = function(action, handler) {
    var registry = new Registry();
    registry.register(action, handler);
    return registry;
};

Registry.prototype.register = function(action, handler) {
    this.handlers[action] = handler || _.noop;
};

Registry.prototype.getHandler = function(action) {
    if (!this.handlers[action]) {
        throw new Error(`No action ${message.action} registered`);
    } else {
        return this.handlers[action];
    }
};

module.exports = Registry;