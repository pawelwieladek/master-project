import _ from 'lodash';
import React from 'react';
import { State, Navigation } from 'react-router'
import { Row, Col, Button, Input, Well, Glyphicon } from 'react-bootstrap';
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
                <div>
                    <Input type='text' ref='iterations' label='Iterations' defaultValue={100} />
                </div>
                <Well>
                    <Row>
                        <Col md={6}>
                            <Button onClick={() => this.transitionTo('/learn/create')}><Glyphicon glyph="chevron-left" /> Back</Button>
                        </Col>
                        <Col md={6} className="text-right">
                            <Button bsStyle="primary" onClick={this.learn}>Learn <Glyphicon glyph="chevron-right" /></Button>
                        </Col>
                    </Row>
                </Well>
            </div>
        );
    }
});