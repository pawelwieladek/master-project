import React from 'react';
import { ListenerMixin } from 'reflux';
import { Navigation } from 'react-router';
import { Grid, Row, Col, Button, Input, Well } from 'react-bootstrap';
import { Repeat, List } from 'immutable';

import { createPlayerAction } from '../../actions/learn-player-actions.js';
import LearnPlayerStore from '../../stores/learn-player-store.js';

export default React.createClass({
    displayName: 'CreateLearnPlayerPage',
    mixins: [ ListenerMixin, Navigation ],
    getInitialState() {
        return {
            learningRate: null,
            isLoading: false
        };
    },
    componentDidMount() {
        this.listenTo(LearnPlayerStore, this.didCreatePlayer);
    },
    didCreatePlayer() {
        this.setState({ isLoading: false });
        this.transitionTo('learn-settings', { learningRate: this.state.learningRate });
    },
    createPlayer() {
        let learningRate = this.refs['learningRate'].getValue();
        this.setState({ isLoading: true, learningRate });
        createPlayerAction(learningRate);
    },
    render() {
        return (
            <div>
                <div className="page-wrapper">
                    <Grid>
                        <Row>
                            <Col md={12}>
                                <Input
                                    type='text'
                                    ref='learningRate'
                                    label='Learning rate'
                                    placeholder='Learning rate'
                                    defaultValue={0.002}
                                    addonBefore={<span className="fa fa-graduation-cap" />}
                                    help="Learning rate determine how fast the algorithm learns. If it's to low the algorithm can never reach its maximum. Otherwise if it's too high algorithm can omit some important knowledge that has to be gained." />
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col md={12} className="text-right">
                            <Button bsStyle="primary" onClick={this.createPlayer}>Create player <span className="fa fa-fw fa-chevron-right"></span></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});