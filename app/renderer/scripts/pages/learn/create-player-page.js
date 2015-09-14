import ipc from 'ipc';
import React from 'react';
import { Navigation } from 'react-router';
import { Row, Col, Button, Input } from 'react-bootstrap';
import { Repeat, List } from 'immutable';

import { createPlayerAction } from '../../../../browser/actions/learn-actions.js';
import GameGrid from '../../components/game-grid';
import CommunicationMixin from '../../mixins/communication-mixin';

let CreatePlayerPage = React.createClass({
    displayName: 'CreatePlayerPage',
    mixins: [ CommunicationMixin, Navigation ],
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentDidMount() {
        this.listenTo(createPlayerAction, this.didCreatePlayer);
    },
    didCreatePlayer() {
        this.setState({
            isLoading: false
        });
        this.transitionTo('/learning/learn');
    },
    createPlayer() {
        this.setState({
            isLoading: true
        });
        this.trigger(createPlayerAction);
    },
    render() {
        return (
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col xs={12}>
                            <GameGrid tiles={Repeat(0, 16).toArray()} disabled />
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row>
                        <Col xs={12}>
                            <Input type='text' label='Learning rate' placeholder='Learning rate' defaultValue={0.01} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Button onClick={this.createPlayer}>Create player</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
});

export default CreatePlayerPage;