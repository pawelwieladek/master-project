import _ from 'lodash';
import React from 'react';
import { State, Navigation } from 'react-router'
import { Grid, Row, Col, Button, Input, Well } from 'react-bootstrap';
import assign from 'object-assign';

import { learnAction } from '../../actions/learn-player-actions.js';

export default React.createClass({
    displayName: 'LearnSettingsPage',
    mixins: [ State, Navigation ],
    learn() {
        let iterations = this.refs['iterations'].getValue();
        learnAction(iterations);
        this.transitionTo('/learn/results', this.getParams(), { iterations });
    },
    render() {
        return (
            <div>
                <div className="page-wrapper">
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <Input type='text' ref='iterations' label='Iterations' defaultValue={100} addonBefore={<span className="fa fa-fw fa-retweet" />} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col md={6}>
                            <Button onClick={() => this.transitionTo('/learn/create')}><span className="fa fa-fw fa-chevron-left" /> Create player</Button>
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