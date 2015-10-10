import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { Navigation } from 'react-router';

import Topbar from '../components/topbar.js';
import GameGrid from '../components/game-grid';

export default React.createClass({
    mixins: [ Navigation ],
    render() {
        return (
            <div className="app-page">
                <Topbar />
                <div className="page-wrapper">
                    <Grid>
                        <Row>
                            <Col md={6}>
                                <div className="text-center">
                                    <div className="landing-icon">
                                        <span className="fa fa-fw fa-search" />
                                    </div>
                                    <span className="h2">Search mode</span>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <h4>Algorithm: Alpha-beta</h4>
                                    <ul className="list-unstyled" style={{ marginTop: 20 }}>
                                        <li>
                                            <span className="bullet" />
                                            Uses well-known strategies
                                        </li>
                                        <li>
                                            <span className="bullet" />
                                            Estimates game states with predefined evaluation functions
                                        </li>
                                        <li>
                                            <span className="bullet" />
                                            Search for the state with the best evaluation value
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ marginTop: 40 }} className="text-center">
                                    <Button bsStyle="primary" onClick={() => this.transitionTo('/search')}>Play with Search algorithm <span className="fa fa-fw fa-chevron-right"></span></Button>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="text-center">
                                    <div className="landing-icon">
                                        <span className="fa fa-fw fa-graduation-cap" />
                                    </div>
                                    <span className="h2">Learn mode</span>
                                </div>
                                <div style={{ marginTop: 20 }}>
                                    <h4>Algorithm: Reinforcement learning</h4>
                                    <ul className="list-unstyled" style={{ marginTop: 20 }}>
                                        <li>
                                            <span className="bullet" />
                                            Has no knowledge about any strategy
                                        </li>
                                        <li>
                                            <span className="bullet" />
                                            Perform numerous games to learn its own strategy
                                        </li>
                                        <li>
                                            <span className="bullet" />
                                            Receives feedback after each move to update its knowledge
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ marginTop: 40 }} className="text-center">
                                    <Button bsStyle="primary" onClick={() => this.transitionTo('/learn')}>Play with Learn algorithm <span className="fa fa-fw fa-chevron-right"></span></Button>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
});