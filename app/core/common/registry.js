import _ from "lodash";

class RegistryBuilder {
    constructor() {
        this.registry = new Registry();
    }

    withHandler(action, handler) {
        this.registry.register(action, handler);
        return this;
    }

    build() {
        return this.registry;
    }
}

export default class Registry {
    constructor() {
        this.handlers = {};
    }

    static withHandler(action, handler) {
        let builder = new RegistryBuilder();
        return builder.withHandler(action, handler);
    }

    use(middleware) {
        middleware(this);
    }

    static createWithNoopHandlers(actions) {
        let registry = new Registry();
        _.forEach(actions, action => registry.register(action));
        return registry;
    }

    register(action, handler) {
        this.handlers[action] = handler || _.noop;
    }

    getHandler(action) {
        if (!this.handlers[action]) {
            throw new Error(`No action ${message.action} registered`);
        } else {
            return this.handlers[action];
        }
    }
}