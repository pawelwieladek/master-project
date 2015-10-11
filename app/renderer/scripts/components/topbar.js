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
                        <ul className="list-inline">
                            <li><Button onClick={() => this.transitionTo('/search')}><span className="fa fa-fw fa-search" /> Search</Button></li>
                            <li><Button onClick={() => this.transitionTo('/learn')}><span className="fa fa-fw fa-graduation-cap" /> Learn</Button></li>
                        </ul>
                    </Col>
                    <Col md={6} className="text-center">
                        <div className="logo">2048</div>
                    </Col>
                    <Col md={3} className="text-right">
                        <ButtonGroup>
                            <Button onClick={() => this.transitionTo('/')}><span className="fa fa-fw fa-home"></span></Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </div>
        )
    }
});

export default Topbar;