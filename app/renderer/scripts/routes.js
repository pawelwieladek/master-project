import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import AppPage from './pages/app-page';
import SearchIndexPage from './pages/search/index.js';
import SearchPlayGamePage from './pages/search/play-game-page.js';
import LearnIndexPage from './pages/learn/index.js';
import LearnCreatePlayerPage from './pages/learn/create-player-page.js';
import LearningLearnPage from './pages/learn/learn-page.js';

let routes = (
    <Route handler={AppPage}>
        <Route path='learning' handler={LearnIndexPage}>
            <DefaultRoute handler={LearnCreatePlayerPage}/>
            <Route path='create' handler={LearnCreatePlayerPage}/>
            <Route path='learn' handler={LearningLearnPage}/>
        </Route>
        <Route path='searching' handler={SearchIndexPage}>
            <DefaultRoute handler={SearchPlayGamePage}/>
            <Route path='create' handler={SearchPlayGamePage}/>
        </Route>
    </Route>
);

export default routes;