import ipc from 'ipc';
import React, { PropTypes } from 'react';
import { State, Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Grid, Row, Col, Button, Input, ProgressBar, Well, Tabs, Tab, Label } from 'react-bootstrap';
import { Repeat, Range, List, Record } from 'immutable';
import ReactSlider from 'react-slider';
import Select from 'react-select';
import Highcharts from 'react-highcharts';
import numeral from 'numeral';
import jquery from 'jquery';

import { killChildProcessIntent } from '../../../../browser/intents/common-intents.js';
import { learnAction } from '../../actions/learn-player-actions.js';
import LearnPlayerStore from '../../stores/learn-player-store.js';

let ResultRecord = Record({
    'start': null,
    'end': null,
    'wins': null,
    'winningRate': null
});

let ChartResults = React.createClass({
    displayName: 'ChartResults',
    propTypes: {
        resultRecords: PropTypes.array.isRequired
    },
    componentDidUpdate() {
        this.redraw();
    },
    componentDidMount() {
        this.redraw();
    },
    redraw() {
        let categories = this.props.resultRecords.map(record => `${record.end}`);
        let data = this.props.resultRecords.map(record => record.winningRate);
        let chart = this.refs.chart.getChart();
        chart.xAxis[0].setCategories(categories, false);
        chart.series[0].setData(data, false);
        chart.redraw();
    },
    statics: {
        config: {
            chart: {
                height: 240
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    text: 'Games learned'
                },
                categories: []
            },
            yAxis: {
                title: {
                    text: 'Winning rate'
                },
                min: 0.0,
                max: 1.0
            },
            series: [{
                name: 'Winning rate',
                data: []
            }]
        }
    },
    render() {
        return (
            <Highcharts ref="chart" config={ChartResults.config} isPureConfig={true} />
        );
    }
});

let TableResults = React.createClass({
    displayName: 'TableResults',
    propTypes: {
        resultRecords: PropTypes.array.isRequired
    },
    renderResultRows() {
        return this.props.resultRecords.map((record, i) => (
            <tr key={`result-${i}`}>
                <td>
                    {`${record.start} - ${record.end}`}
                </td>
                <td>
                    {record.wins}
                </td>
                <td>
                    {numeral(record.winningRate).format('0.00%')}
                </td>
            </tr>
        ));
    },
    render() {
        let resultRows = this.renderResultRows();
        return (
            <table className="table table-hover table-striped table-bordered table-condensed">
                <thead>
                <tr>
                    <th>
                        <strong>Games</strong>
                    </th>
                    <th>
                        <strong>Wins</strong>
                    </th>
                    <th>
                        <strong>Winning rate</strong>
                    </th>
                </tr>
                </thead>
                <tbody>
                {resultRows}
                </tbody>
            </table>
        )
    }
});

let ResultTabs = React.createClass({
    displayName: 'ResultsPanel',
    propTypes: {
        results: PropTypes.array.isRequired,
        granularity: PropTypes.number.isRequired
    },
    shouldComponentUpdate(nextProps) {
        return nextProps.granularity !== this.props.granularity || nextProps.results.length % this.props.granularity === 0
    },
    getResultRecords() {
        let limit = Math.floor(this.props.results.length / this.props.granularity);
        let results = this.props.results.slice(0, this.props.granularity * limit);
        return Range(0, limit).map(i => {
            let wins = List(results).slice(i * this.props.granularity, (i + 1) * this.props.granularity).reduce((reduction, value) => value ? reduction + 1 : reduction, 0);
            let winningRate = wins / this.props.granularity;
            let start = i * this.props.granularity + 1;
            let end = (i + 1) * this.props.granularity;
            return new ResultRecord({ start, end, wins, winningRate });
        }).toArray();
    },
    render() {
        let resultRecords = this.getResultRecords();
        let noData = (<div className="text-center">
            <h4><i className="fa fa-fw fa-flask" /> Not enough results to show</h4>
        </div>);
        let table = resultRecords.length > 0 ? <TableResults resultRecords={resultRecords} /> : noData;
        let chart = resultRecords.length > 0 ? <ChartResults resultRecords={resultRecords} /> : noData;
        return (
            <div>
                <Tabs defaultActiveKey={1} animation={false}>
                    <Tab eventKey={1} title="Table">
                        {table}
                    </Tab>
                    <Tab eventKey={2} title="Chart">
                        {chart}
                    </Tab>
                </Tabs>
            </div>
        );
    }
});

export default React.createClass({
    mixins: [ ListenerMixin, State, Navigation ],
    displayName: 'LearnResultsPage',
    getInitialState() {
        return {
            isLearning: !_.isUndefined(this.props.query.iterations),
            results: LearnPlayerStore.results,
            iterations: LearnPlayerStore.results.length + parseInt(this.props.query.iterations),
            granularity: 100
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
    granularityChanged(granularity) {
        this.setState({ granularity });
    },
    renderGranularitySelect() {
        return (
            <Select
                ref="granularity"
                name="granularity"
                value={this.state.granularity}
                options={[
                    { value: 100, label: "100" },
                    { value: 500, label: "500" },
                    { value: 1000, label: "1000" },
                    { value: 2000, label: "2000" }
                ]}
                clearable={false}
                onChange={this.granularityChanged} />
        );
    },
    render() {
        let progressValue = this.state.isLearning ? Math.round((100 * this.state.results.length) / this.state.iterations) : 100;
        let granularitySelect = this.renderGranularitySelect();
        let { learningRate } = this.getParams();
        return (
            <div>
                <div className="page-wrapper">
                    <Grid>
                        <div>
                            <ProgressBar bsStyle={this.state.isLearning ? "default" : "success"} now={progressValue} />
                        </div>
                        <Row style={{ marginBottom: 10 }}>
                            <Col xs={3} style={{ lineHeight: '39px' }}>
                                <ul className="list-inline">
                                    <li>
                                        <strong>Learning rate</strong>
                                    </li>
                                    <li>
                                        <h4><Label bsStyle="primary">{learningRate}</Label></h4>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={3} style={{ lineHeight: '39px' }}>
                                <ul className="list-inline">
                                    <li>
                                        <strong>Games learned</strong>
                                    </li>
                                    <li>
                                        <h4><Label bsStyle="primary">{this.state.results.length}</Label></h4>
                                    </li>
                                </ul>
                            </Col>
                            <Col xs={3} className="text-right" style={{ lineHeight: '39px' }}>
                                <strong>Granularity</strong>
                            </Col>
                            <Col xs={3}>
                                {granularitySelect}
                            </Col>
                        </Row>
                        <div>
                            <ResultTabs results={this.state.results} granularity={this.state.granularity} />
                        </div>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col md={6}>
                            <Button onClick={() => this.transitionTo('learn-settings', this.getParams())}><span className="fa fa-fw fa-chevron-left"></span>Learn more games</Button>
                        </Col>
                        <Col md={6} className="text-right">
                            <Button bsStyle="primary" onClick={() => this.transitionTo('learn-play', this.getParams())}>Play <span className="fa fa-fw fa-chevron-right"></span></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});