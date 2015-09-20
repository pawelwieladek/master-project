import React from 'react';
import { Route, DefaultRoute } from 'react-router';

import AppPage from './pages/app-page';

import SearchIndexPage from './pages/search/index-page.js';
import CreateSearchPlayerPage from './pages/search/create-player-page.js';
import PlaySearchGamePage from './pages/search/play-game-page.js';

import LearnIndexPage from './pages/learn/index-page.js';
import CreateLearnPlayer from './pages/learn/create-player-page.js';
import LearnSettingsPage from './pages/learn/settings-page.js';
import LearnResultsPage from './pages/learn/results-page.js';

let routes = (
    <Route handler={AppPage}>
        <Route path='search' handler={SearchIndexPage}>
            <DefaultRoute handler={CreateSearchPlayerPage}/>
            <Route path='create' handler={CreateSearchPlayerPage}/>
            <Route path='play' handler={PlaySearchGamePage}/>
        </Route>
        <Route path='learn' handler={LearnIndexPage}>
            <DefaultRoute handler={CreateLearnPlayer}/>
            <Route path='create' handler={CreateLearnPlayer}/>
            <Route path='settings' handler={LearnSettingsPage}/>
            <Route path='results' handler={LearnResultsPage}/>
        </Route>
    </Route>
);

export default routes;