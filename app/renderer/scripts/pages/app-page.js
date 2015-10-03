import React from 'react';
import { RouteHandler } from 'react-router';
import Topbar from '../components/topbar.js';

require('!style!css!sass!../../styles/style.scss');

let AppPage = React.createClass({
    render () {
        return (
            <div className="app-page">
                <Topbar />
                <RouteHandler />
            </div>
        )
    }
});

export default AppPage;