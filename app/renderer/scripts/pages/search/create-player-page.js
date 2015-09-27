import React from 'react';
import { Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Row, Col, Button, Input, Well, Glyphicon } from 'react-bootstrap';

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
    createPlayer() {
        let depth = parseFloat(this.refs['depth'].getValue());
        let monotonicity = parseFloat(this.refs['monotonicity'].getValue());
        let smoothness = parseFloat(this.refs['smoothness'].getValue());
        let availability = parseFloat(this.refs['availability'].getValue());
        let maximization = parseFloat(this.refs['maximization'].getValue());
        this.setState({ isLoading: true });
        createPlayerAction({ depth, monotonicity, smoothness, availability, maximization });
    },

    render() {
        return (
            <div>
                <Row>
                    <Col sm={4}>
                        <Input type="text" ref="depth" label="Game tree depth" />
                    </Col>
                    <Col sm={4}>
                        <Input type="text" ref="monotonicity" label="Monotonicity weight" />
                    </Col>
                    <Col sm={4}>
                        <Input type="text" ref="smoothness" label="Smoothness weight" />
                    </Col>
                    <Col sm={4}>
                        <Input type="text" ref="availability" label="Availability weight" />
                    </Col>
                    <Col sm={4}>
                        <Input type="text" ref="maximization" label="Maximization weight" />
                    </Col>
                </Row>
                <Well>
                    <Row>
                        <Col sm={12} className="text-right">
                            <Button onClick={this.createPlayer}>Play <Glyphicon glyph="chevron-right" /></Button>
                        </Col>
                    </Row>
                </Well>
            </div>
        );
    }
});