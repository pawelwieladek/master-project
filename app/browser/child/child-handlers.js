import searchHandlers from '../handlers/search-handlers/child-search-handlers';

let handlers = registry => {
    searchHandlers(registry);
};

export default handlers;