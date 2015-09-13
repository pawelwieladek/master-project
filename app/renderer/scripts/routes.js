import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import AppPage from './pages/app-page';
import SearchIndexPage from './pages/search/index.js';
import SearchPlayGamePage from './pages/search/play-game-page.js';
import LearnIndexPage from './pages/learn/index.js';
import LearnCreatePlayerPage from './pages/learn/create-player-page.js';
import LearnLearnPage from './pages/learn/create-player-page.js';

let routes = (
    <Route handler={AppPage}>
        <Route name='learn' path='learn' handler={LearnIndexPage}>
            <DefaultRoute handler={LearnCreatePlayerPage}/>
            <Route name='learn:create' path='create' handler={LearnCreatePlayerPage}/>
            <Route name='learn:learn' path='learn' handler={LearnCreatePlayerPage}/>
        </Route>
        <Route name='search' handler={SearchIndexPage}>
            <DefaultRoute handler={SearchPlayGamePage}/>
            <Route name='search:play' path='create' handler={SearchPlayGamePage}/>
        </Route>
    </Route>
);

export default routes;