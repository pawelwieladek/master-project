import ipc from 'ipc';
import React from 'react';
import { State, Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Row, Col, Button, Input, ProgressBar, Glyphicon, Well } from 'react-bootstrap';
import { Repeat, Range, List } from 'immutable';
import ReactSlider from 'react-slider';

import { killChildProcessIntent } from '../../../../browser/intents/common-intents.js';
import { learnAction } from '../../actions/learn-player-actions.js';
import LearnPlayerStore from '../../stores/learn-player-store.js';

let ResultsComponent = React.createClass({
    mixins: [ State, Navigation ],
    displayName: 'LearnResultsComponent',
    propTypes: {
        results: React.PropTypes.array.isRequired
    },
    getInitialState() {
        return {
            granularity: this.props.query && this.props.query.granularity ? this.props.query.granularity : 100
        }
    },
    granularityChanged() {
        let granularity = parseInt(this.refs['granularity'].getValue());
        this.setState({ granularity });
        this.replaceWith(this.getPath(), this.getParams(), { granularity });
    },
    renderResults() {
        let granularity = this.state.granularity;
        if (granularity) {
            let limit = Math.ceil(this.props.results.length / this.state.granularity);
            return Range(0, limit).map(i => {
                let wins = List(this.props.results).slice(i * granularity, (i + 1) * granularity).reduce((reduction, value) => value ? reduction + 1 : reduction, 0);
                let rangeFrom = i * granularity + 1;
                let rangeTo = (i + 1) * granularity < this.props.results.length ? (i + 1) * granularity : this.props.results.length;
                return (
                    <Row key={`result-${i}`}>
                        <Col xs={3}>
                            {rangeFrom}
                        </Col>
                        <Col xs={3}>
                            {rangeTo}
                        </Col>
                        <Col xs={6}>
                            {wins}
                        </Col>
                    </Row>
                )
            });
        }
    },
    render() {
        let results = this.renderResults();
        return (
            <div>
                <div>
                    <Input
                        type='text'
                        ref='granularity'
                        label='Granularity'
                        defaultValue={this.state.granularity}
                        onChange={this.granularityChanged} />
                </div>
                <div>
                    <Row>
                        <Col xs={3}>
                            <strong>From</strong>
                        </Col>
                        <Col xs={3}>
                            <strong>To</strong>
                        </Col>
                        <Col xs={6}>
                            <strong>Wins</strong>
                        </Col>
                    </Row>
                    {results}
                </div>
            </div>
        )
    }
});

export default React.createClass({
    mixins: [ ListenerMixin, State, Navigation ],
    displayName: 'LearnResultsPage',
    getInitialState() {
        return {
            isLearning: !_.isUndefined(this.props.query.iterations),
            showResults: true,
            results: LearnPlayerStore.results,
            iterations: LearnPlayerStore.results.length + parseInt(this.props.query.iterations)
        };
    },
    componentDidMount() {
        this.listenTo(LearnPlayerStore, this.storeChanged);
    },
    componentWillUnmount() {
        ipc.send(killChildProcessIntent);
    },
    storeChanged() {
        let isLearning = LearnPlayerStore.results.length !== this.state.iterations;
        this.setState({
            isLearning,
            results: LearnPlayerStore.results
        });
    },
    showResultsChanged() {
        this.setState({
            showResults: !this.state.showResults
        });
    },
    render() {
        let progressValue = this.state.isLearning ? Math.round((100 * this.state.results.length) / this.state.iterations) : 100;
        let results = this.state.showResults && this.state.results.length > 0 ? <ResultsComponent results={this.state.results} /> : null;

        return (
            <div>
                <Well>
                    <Row>
                        <Col md={6}>
                            <Button onClick={() => this.transitionTo('/learn/settings', this.getParams(), this.getQuery())}><Glyphicon glyph="chevron-left" /> Back</Button>
                        </Col>
                        <Col md={6} className="text-right">
                            <Button bsStyle="primary" onClick={() => this.transitionTo('/learn/play')}><Glyphicon glyph="chevron-right" /> Play</Button>
                        </Col>
                    </Row>
                </Well>
                <div>
                    <ProgressBar bsStyle={this.state.isLearning ? "default" : "success"} now={progressValue} />
                </div>
                <div>
                    <Input type="checkbox" label="Show results" checked={this.state.showResults} onChange={this.showResultsChanged} />
                </div>
                <div>
                    {results}
                </div>
            </div>
        );
    }
});