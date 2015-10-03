import React from 'react';
import { Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Grid, Row, Col, Button, Input, Well, Glyphicon } from 'react-bootstrap';

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
                <div className="page-wrapper">
                    <Grid>
                        <Row>
                            <Col sm={4}>
                                <NumberInput type="text" ref="depth" label="Game tree depth" defaultValue={Config.Defaults.Search.Depth} addonBefore={<span className="fa fa-fw fa-sitemap"></span>} />
                            </Col>
                            <Col sm={4}>
                                <NumberInput type="text" ref="monotonicity" label="Monotonicity weight" defaultValue={Config.Defaults.Search.Monotonicity} addonBefore={<i className="fa fa-fw fa-sort-numeric-asc"></i>} />
                            </Col>
                            <Col sm={4}>
                                <NumberInput type="text" ref="smoothness" label="Smoothness weight" defaultValue={Config.Defaults.Search.Smoothness} addonBefore={<i className="fa fa-fw fa-star-half-o"></i>} />
                            </Col>
                            <Col sm={4}>
                                <NumberInput type="text" ref="availability" label="Availability weight" defaultValue={Config.Defaults.Search.Availability} addonBefore={<i className="fa fa-fw fa-th"></i>} />
                            </Col>
                            <Col sm={4}>
                                <NumberInput type="text" ref="maximization" label="Maximization weight" defaultValue={Config.Defaults.Search.Maximization} addonBefore={<i className="fa fa-fw fa-trophy"></i>} />
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col sm={12} className="text-right">
                            <Button bsStyle="primary" onClick={this.createPlayer}>Play <Glyphicon glyph="chevron-right" /></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});
