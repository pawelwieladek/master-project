import React from 'react';
import { Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Row, Col, Button, Input, Well } from 'react-bootstrap';

import Config from '../../../../../config/config';
import NumberInput from '../../components/number-input';
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
                        <NumberInput type="text" ref="depth" label="Game tree depth" defaultValue={Config.Defaults.Search.Depth} />
                    </Col>
                    <Col sm={4}>
                        <NumberInput type="text" ref="monotonicity" label="Monotonicity weight" defaultValue={Config.Defaults.Search.Monotonicity} />
                    </Col>
                    <Col sm={4}>
                        <NumberInput type="text" ref="smoothness" label="Smoothness weight" defaultValue={Config.Defaults.Search.Smoothness} />
                    </Col>
                    <Col sm={4}>
                        <NumberInput type="text" ref="availability" label="Availability weight" defaultValue={Config.Defaults.Search.Availability} />
                    </Col>
                    <Col sm={4}>
                        <NumberInput type="text" ref="maximization" label="Maximization weight" defaultValue={Config.Defaults.Search.Maximization} />
                    </Col>
                </Row>
                <Well>
                    <Row>
                        <Col sm={12} className="text-right">
                            <Button bsStyle="primary" onClick={this.createPlayer}>Create player</Button>
                        </Col>
                    </Row>
                </Well>
            </div>
        );
    }
});
