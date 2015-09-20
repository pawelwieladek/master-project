import React from 'react';
import { Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Row, Col, Button, Input } from 'react-bootstrap';

import { createPlayerAction } from '../../actions/search-player-actions';
import SearchModeStore from '../../stores/search-player-store';

export default React.createClass({
    displayName: 'CreateSearchPlayerPage',
    mixins: [ ListenerMixin, Navigation ],
    getInitialState() {
        return {
            isLoading: false
        };
    },
    componentDidMount() {
        this.listenTo(SearchModeStore, this.didCreatePlayer);
    },
    didCreatePlayer() {
        this.transitionTo('/search/play');
    },
    createPlayer(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        createPlayerAction();
    },
    render() {
        return (
            <div>
                <Row>
                    <Col sm={12}>
                        <Input type="text" label="Game tree depth" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Input type="text" label="Monotonicity weight" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Input type="text" label="Smoothness weight" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Input type="text" label="Availability weight" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Input type="text" label="Maximization weight" />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Button onClick={this.createPlayer}>Create player</Button>
                    </Col>
                </Row>
            </div>
        );
    }
});