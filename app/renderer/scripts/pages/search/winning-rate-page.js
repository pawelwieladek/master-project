import ipc from 'ipc';
import React from 'react';
import { Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Grid, Row, Col, Button, Input, Alert, Well, ProgressBar } from 'react-bootstrap';
import { Repeat, List } from 'immutable';
import ReactSlider from 'react-slider';

import { killChildProcessIntent } from '../../../../browser/intents/common-intents.js';
import GameGrid from '../../components/game-grid';
import SearchIntents from '../../../../browser/intents/search-intents';

export default React.createClass({
    displayName: 'SearchWinningRatePage',
    mixins: [ ListenerMixin, Navigation ],
    getInitialState() {
        return {
            tiles: this.getEmptyTiles(),
            results: [],
            gamesNumber: null,
            isDone: false,
            isInProgress: false
        };
    },
    componentDidMount() {
        ipc.on(SearchIntents.multipleGames.playIntent, this.didPlayAllGames);
        ipc.on(SearchIntents.multipleGames.notifyIntent, this.didNotifyProgress);
    },
    componentWillUnmount() {
        ipc.send(killChildProcessIntent);
    },
    didNotifyProgress(tiles) {
        this.setState({
            results: this.state.results.concat([tiles])
        });
    },
    didPlayAllGames() {
        this.setState({
            isDone: true,
            isInProgress: false
        });
    },
    calculateWinningRate() {
        let gamesNumber = this.refs['gamesNumber'].getValue();
        this.setState({
            isDone: false,
            isInProgress: true,
            results: [],
            tiles: this.getEmptyTiles(),
            gamesNumber
        });
        ipc.send(SearchIntents.multipleGames.playIntent, gamesNumber);
    },
    getEmptyTiles() {
        return Repeat(0, 16).toArray();
    },
    sliderChanged(value) {
        this.setState({
            tiles: this.state.results[value]
        });
    },
    renderSlider() {
        return this.state.isDone ? (
            <Well>
                <div style={{ marginBottom: 10 }}>
                    <strong>Games</strong>
                </div>
                <ReactSlider
                    min={0}
                    max={this.state.results.length - 1}
                    defaultValue={this.state.results.length - 1}
                    onChange={this.sliderChanged} />
            </Well>
        ) : null;
    },
    renderProgressBar() {
        if (this.state.isInProgress) {
            let progressValue = Math.round((100 * this.state.results.length) / this.state.gamesNumber);
            return (
                <ProgressBar bsStyle="default" now={progressValue} />
            )
        } else {
            return null;
        }
    },
    renderWinningRate() {
        if (this.state.isDone) {
            let winningRate = Math.round((100 * this.state.results.filter(tiles => Math.max(...tiles) === 11).length) / this.state.results.length);
            return (
                <Alert bsStyle="info" className="h4">Winning rate: {`${winningRate}%`}</Alert>
            )
        } else {
            return null;
        }
    },
    renderCalculateButton() {
        let isDisabled = this.state.isInProgress;
        let label = !this.state.isInProgress ? 'Calculate winning rate' : 'Calculating winning rate...';
        return (
            <Button
                bsStyle="primary"
                onClick={this.calculateWinningRate}
                disabled={isDisabled}>
                <span className="fa fa-fw fa-rocket" /> {label}
            </Button>
        );
    },
    render() {
        let slider = this.renderSlider();
        let progressBar = this.renderProgressBar();
        let winningRate = this.renderWinningRate();
        let calculateButton = this.renderCalculateButton();
        return (
            <div>
                <div className="page-wrapper">
                    <Grid>
                        <Row>
                            <Col sm={6}>
                                <div style={{ marginBottom: 20 }}>
                                    <GameGrid tiles={this.state.tiles} />
                                </div>
                                <div>
                                    {slider}
                                </div>
                            </Col>
                            <Col sm={6}>
                                <div>
                                    <Input type='text' ref='gamesNumber' label='Games number' defaultValue={10} addonBefore={<span className="fa fa-fw fa-retweet" />} />
                                </div>
                                <div>
                                    <Well className="text-left">
                                        {calculateButton}
                                    </Well>
                                </div>
                                <div>
                                    {progressBar}
                                </div>
                                <div>
                                    {winningRate}
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col md={12}>
                            <Button onClick={() => this.transitionTo('/search/play')}><span className="fa fa-fw fa-chevron-left" />Back to Play</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});