import React from 'react';
import { RouteHandler } from 'react-router';

let IndexPage = React.createClass({
    render () {
        return (
            <div>
                <h1>Search</h1>
                <RouteHandler/>
            </div>
        )
    }
});

export default IndexPage;