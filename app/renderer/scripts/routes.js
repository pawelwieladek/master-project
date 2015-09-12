import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import AppPage from './pages/app-page';
import SearchPlayerPage from './pages/search-player-page';
import LearnPlayerPage from './pages/learn-player-page';

let routes = (
    <Route handler={AppPage}>
        <DefaultRoute handler={SearchPlayerPage}/>
        <Route name='search' path='search' handler={SearchPlayerPage}/>
        <Route name='learn' path='learn' handler={LearnPlayerPage}/>
    </Route>
);

export default routes;