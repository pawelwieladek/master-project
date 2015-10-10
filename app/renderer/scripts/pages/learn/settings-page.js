import _ from 'lodash';
import React from 'react';
import { State, Navigation } from 'react-router'
import { Grid, Row, Col, Button, Input, Label } from 'react-bootstrap';
import assign from 'object-assign';

import { learnAction } from '../../actions/learn-player-actions.js';

export default React.createClass({
    displayName: 'LearnSettingsPage',
    mixins: [ State, Navigation ],
    learn() {
        let iterations = this.refs['iterations'].getValue();
        learnAction(iterations);
        this.transitionTo('learn-results', this.getParams(), { iterations });
    },
    render() {
        let { learningRate } = this.getParams();
        return (
            <div>
                <div className="page-wrapper">
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <Input
                                    type='text'
                                    ref='iterations'
                                    label='Games to learn'
                                    defaultValue={10000}
                                    addonBefore={<span className="fa fa-fw fa-retweet" />}
                                    help='The more games algorithm will learn the better score it gets. Learning process can take a long while.'
                                    />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <ul className="list-inline">
                                    <li>
                                        <strong>Learning rate</strong>
                                    </li>
                                    <li>
                                        <span className="h4"><Label bsStyle="primary">{learningRate}</Label></span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col md={6}>
                            <Button bsStyle="warning" onClick={() => this.transitionTo('learn-create')}><span className="fa fa-fw fa-chevron-left" /> Create new player</Button>
                        </Col>
                        <Col md={6} className="text-right">
                            <Button bsStyle="primary" onClick={this.learn}>Learn <span className="fa fa-fw fa-chevron-right" /></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});