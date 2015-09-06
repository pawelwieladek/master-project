import searchHandlers from '../handlers/search-handlers/main-search-handlers';

let handlers = app => {
    searchHandlers(app);
};

export default handlers;