import React from 'react';
import { Navigation } from 'react-router';
import { Well, ButtonGroup, Button } from 'react-bootstrap';

let Topbar = React.createClass({
    mixins: [ Navigation ],
    render () {
        return (
            <Well>
                <ButtonGroup>
                    <Button onClick={() => this.transitionTo('/searching')}>Search</Button>
                    <Button onClick={() => this.transitionTo('/learning')}>Learn</Button>
                </ButtonGroup>
            </Well>
        )
    }
});

export default Topbar;