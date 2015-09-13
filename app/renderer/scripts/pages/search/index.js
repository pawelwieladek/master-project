import React from 'react';
import { RouteHandler } from 'react-router';

let SearchIndexPage = React.createClass({
    render () {
        return (
            <div>
                <h1>Search</h1>
                <RouteHandler/>
            </div>
        )
    }
});

export default SearchIndexPage;