import ipc from 'ipc';
import React from 'react';
import { Row, Col, Button, Input, Alert, ProgressBar } from 'react-bootstrap';
import { Repeat, Range, List } from 'immutable';
import ReactSlider from 'react-slider';

import { createPlayerAction, learnAction, notifyLearnProgressAction } from '../../../../browser/actions/learn-actions.js';
import CommunicationMixin from '../../mixins/communication-mixin';

let LearnPage = React.createClass({
    mixins: [ CommunicationMixin ],
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.shouldUpdate
    },
    getInitialState() {
        return {
            done: false,
            inProgress: false,
            shouldUpdate: true,
            showResults: false,
            results: [],
            resolution: 0,
            iterations: 0
        };
    },
    componentDidMount() {
        this.listenTo(learnAction, this.didLearn);
        this.listenTo(notifyLearnProgressAction, this.didNotifyLearnProgress);
    },
    didLearn() {
        this.setState({
            shouldUpdate: true,
            inProgress: false,
            done: true
        });
    },
    didNotifyLearnProgress(didWin) {
        console.log(didWin);
        let results = this.state.results.concat([didWin]);
        this.setState({
            shouldUpdate: results.length % this.state.resolution === 0,
            inProgress: true,
            done: false,
            results: results
        });
    },
    learn() {
        let iterations = this.refs['iterations'].getValue();
        let resolution = this.refs['resolution'].getValue();
        this.trigger(learnAction, iterations);
        this.setState({
            iterations: iterations,
            resolution: resolution,
            shouldUpdate: true,
            inProgress: true,
            done: false
        });
    },
    showResultsChanged() {
        this.setState({
            shouldUpdate: true,
            showResults: !this.state.showResults
        });
    },
    renderResults() {
        let resolution = this.state.resolution;
        if (resolution) {
            let limit = Math.ceil(this.state.results.length / this.state.resolution);
            return Range(0, limit).map(i => {
                let sum = List(this.state.results).slice(i * resolution, (i + 1) * resolution).reduce((reduction, value) => value ? reduction + 1 : reduction, 0);
                return (
                    <Row key={`result-${i}`}>
                        <Col xs={6}>
                            {i * resolution + 1} - {(i + 1) * resolution}
                        </Col>
                        <Col xs={6}>
                            {sum}
                        </Col>
                    </Row>
                )
            });
        }
    },
    render() {
        let alert = this.state.done ? <Alert bsStyle="success">Done</Alert> : null;
        let progressBar = this.state.inProgress ? <ProgressBar now={Math.round((100 * this.state.results.length) / this.state.iterations)} /> : null;
        let results = this.state.showResults ? this.renderResults() : null;
        return (
            <Row>
                <Col sm={6}>
                    {alert}
                    {progressBar}
                    <Input type="checkbox" label="Checkbox" checked={this.state.showResults} onChange={this.showResultsChanged} />
                    {results}
                </Col>
                <Col sm={6}>
                    <div>
                        <Input type='text' ref='iterations' label='Iterations' defaultValue={100} />
                    </div>
                    <div>
                        <Input type='text' ref='resolution' label='Resolution' defaultValue={10} />
                    </div>
                    <div>
                        <Button onClick={this.learn}>Learn</Button>
                    </div>
                </Col>
            </Row>
        );
    }
});

export default LearnPage;