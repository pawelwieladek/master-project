import React from 'react';
import { ListenerMixin } from 'reflux';
import { Navigation } from 'react-router';
import { Row, Col, Button, Input, Well, Glyphicon } from 'react-bootstrap';
import { Repeat, List } from 'immutable';

import { createPlayerAction } from '../../actions/learn-player-actions.js';
import LearnPlayerStore from '../../stores/learn-player-store.js';

export default React.createClass({
    displayName: 'CreateLearnPlayerPage',
    mixins: [ ListenerMixin, Navigation ],
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentDidMount() {
        this.listenTo(LearnPlayerStore, this.didCreatePlayer);
    },
    didCreatePlayer() {
        this.setState({ isLoading: false });
        this.transitionTo('/learn/settings');
    },
    createPlayer() {
        this.setState({ isLoading: true });
        let learningRate = this.refs['learningRate'].getValue();
        createPlayerAction(learningRate);
    },
    render() {
        return (
            <div>
                <div>
                    <Input type='text' ref='learningRate' label='Learning rate' placeholder='Learning rate' defaultValue={0.01} />
                </div>
                <Well>
                    <Row>
                        <Col md={6} mdOffset={6} className="text-right">
                            <Button onClick={this.createPlayer}>Create player <Glyphicon glyph="chevron-right" /></Button>
                        </Col>
                    </Row>
                </Well>
            </div>
        );
    }
});