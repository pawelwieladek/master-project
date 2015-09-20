import React, { PropTypes } from 'react';
import { Navigation } from 'react-router';
import { Row, Col, Well, ButtonGroup, Button } from 'react-bootstrap';

let Topbar = React.createClass({
    displayName: 'Topbar',
    mixins: [ Navigation ],
    render () {
        return (
            <Well>
                <ButtonGroup>
                    <Button onClick={() => this.transitionTo('/search')}>Search</Button>
                    <Button onClick={() => this.transitionTo('/learn')}>Learn</Button>
                </ButtonGroup>
            </Well>
        )
    }
});

export default Topbar;