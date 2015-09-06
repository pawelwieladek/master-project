import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import AppPage from './pages/app-page';
import SearchPlayerPage from './pages/search-player-page';

let routes = (
    <Route handler={AppPage}>
        <DefaultRoute handler={SearchPlayerPage}/>
        <Route path="search" handler={SearchPlayerPage}/>
    </Route>
);

export default routes;