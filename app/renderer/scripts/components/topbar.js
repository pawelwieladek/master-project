import React, { PropTypes } from 'react';
import { Navigation } from 'react-router';
import { Row, Col, Well, ButtonGroup, Button } from 'react-bootstrap';

let Topbar = React.createClass({
    displayName: 'Topbar',
    mixins: [ Navigation ],
    render () {
        return (
            <div className="topbar">
                <ButtonGroup>
                    <Button onClick={() => this.transitionTo('/search')}>Search</Button>
                    <Button onClick={() => this.transitionTo('/learn')}>Learn</Button>
                    <Button onClick={() => this.transitionTo('/sample')}>Sample</Button>
                </ButtonGroup>
            </div>
        )
    }
});

export default Topbar;