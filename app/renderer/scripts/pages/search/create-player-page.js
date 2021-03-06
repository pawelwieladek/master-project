import React from 'react';
import { Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Grid, Row, Col, Button, Input, Well } from 'react-bootstrap';

import Const from '../../../../../config/const';
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
        let colSpan = 6;
        return (
            <div>
                <div className="page-wrapper">
                    <Grid>
                        <Row>
                            <Col sm={12}>
                                <NumberInput
                                    type="text"
                                    ref="depth"
                                    label="Game tree depth"
                                    defaultValue={Const.Defaults.Search.Depth}
                                    addonBefore={<span className="fa fa-fw fa-sitemap"></span>}
                                    help="Number of moves ahead the algorithm will estimate. The higher depth, the longer it takes to calculate result."
                                    />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={colSpan}>
                                <NumberInput
                                    type="text"
                                    ref="monotonicity"
                                    label="Monotonicity weight"
                                    defaultValue={Const.Defaults.Search.Monotonicity}
                                    addonBefore={<i className="fa fa-fw fa-sort-numeric-asc"></i>}
                                    help="Algorithm's best practice: Higher tile values should be placed in the corners of game grid."
                                    />
                            </Col>
                            <Col sm={colSpan}>
                                <NumberInput
                                    type="text"
                                    ref="smoothness"
                                    label="Smoothness weight"
                                    defaultValue={Const.Defaults.Search.Smoothness}
                                    addonBefore={<i className="fa-fw octicon octicon-color-mode"></i>}
                                    help="Algorithm's best practice: Neighbouring tiles should have the same value to be able to merge."
                                    />
                            </Col>
                            <Col sm={colSpan}>
                                <NumberInput
                                    type="text"
                                    ref="availability"
                                    label="Availability weight"
                                    defaultValue={Const.Defaults.Search.Availability}
                                    addonBefore={<i className="fa fa-fw fa-arrows"></i>}
                                    help="Algorithm's best practice: The more places on the grid are free the more moves are available for the player."
                                    />
                            </Col>
                            <Col sm={colSpan}>
                                <NumberInput
                                    type="text"
                                    ref="maximization"
                                    label="Maximization weight"
                                    defaultValue={Const.Defaults.Search.Maximization}
                                    addonBefore={<i className="fa fa-fw fa-trophy"></i>}
                                    help="Algorithm's best practice: Finally, the higher value on the grid, the better. Value 2048 is the goal." />
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col sm={12} className="text-right">
                            <Button bsStyle="primary" onClick={this.createPlayer}>Play <span className="fa fa-fw fa-chevron-right"></span></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});
