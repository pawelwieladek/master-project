import ipc from 'ipc';
import React from 'react';
import { Row, Col, Button, Input } from 'react-bootstrap';
import { Repeat, List } from 'immutable';
import ReactSlider from 'react-slider';

import { createPlayerAction, learnAction, notifyLearnProgressAction } from '../../../browser/actions/learn-actions.js';
import GameGrid from '../components/grid';
import CommunicationMixin from '../mixins/communication-mixin';

let SearchPlayerPage = React.createClass({
    mixins: [ CommunicationMixin ],
    getInitialState() {
        return {
            tiles: Repeat(0, 16).toArray(),
            learnEnabled: false
        };
    },
    componentDidMount() {
        this.listenTo(createPlayerAction, this.didCreatePlayer);
        this.listenTo(learnAction, this.didLearn);
        this.listenTo(notifyLearnProgressAction, this.didNotifyLearnProgress);
    },
    didCreatePlayer() {
        this.setState({
            learnEnabled: true
        });
    },
    didLearn() {
        console.log('didLearn');
    },
    didNotifyLearnProgress(isWin) {
        console.log('didNotifyLearnProgress', isWin);
    },
    createPlayer() {
        this.trigger(createPlayerAction);
    },
    learn() {
        let iterations = this.refs['iterations'].getValue();
        this.trigger(learnAction, iterations);
    },
    render() {
        return (
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col xs={12}>
                            <GameGrid tiles={this.state.tiles} />
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row>
                        <Col xs={12}>
                            <Button onClick={this.createPlayer}>Create player</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Input type='text' ref='iterations' buttonAfter={<Button onClick={this.learn} disabled={!this.state.learnEnabled}>Learn</Button>} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
});

export default SearchPlayerPage;