import React, { PropTypes } from 'react';
import { Navigation } from 'react-router';
import { Row, Col, Well, ButtonGroup, Button } from 'react-bootstrap';

let Topbar = React.createClass({
    displayName: 'Topbar',
    mixins: [ Navigation ],
    render () {
        return (
            <div className="topbar">
                <Row>
                    <Col md={3}>
                        <ButtonGroup>
                            <Button onClick={() => this.transitionTo('/search')}>Search</Button>
                            <Button onClick={() => this.transitionTo('/learn')}>Learn</Button>
                        </ButtonGroup>
                    </Col>
                    <Col md={6} className="logo text-center">
                        <span className="h4"><strong>2048</strong></span>
                    </Col>
                </Row>
            </div>
        )
    }
});

export default Topbar;