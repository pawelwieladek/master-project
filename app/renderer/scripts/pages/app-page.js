import React from 'react';
import { RouteHandler } from 'react-router';
import { Grid } from 'react-bootstrap';

require('!style!css!sass!../../../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');
require('!style!css!sass!../../styles/style.scss');

let AppPage = React.createClass({
    render () {
        return (
            <Grid>
                <RouteHandler/>
            </Grid>
        )
    }
});

export default AppPage;