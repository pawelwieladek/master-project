import React from 'react';
import { RouteHandler } from 'react-router';
import { Grid } from 'react-bootstrap';

import Topbar from './topbar.js';

require('!style!css!sass!../../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('!style!css!sass!../../styles/style.scss');

let AppPage = React.createClass({
    render () {
        return (
            <Grid>
                <Topbar />
                <RouteHandler/>
            </Grid>
        )
    }
});

export default AppPage;