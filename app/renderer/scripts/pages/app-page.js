import React from 'react';
import { RouteHandler } from 'react-router';
import { Grid } from 'react-bootstrap';
import Topbar from '../components/topbar.js';

require('!style!css!sass!../../styles/style.scss');

let AppPage = React.createClass({
    render () {
        return (
            <div>
                <Topbar />
                <Grid>
                    <RouteHandler />
                </Grid>
            </div>
        )
    }
});

export default AppPage;