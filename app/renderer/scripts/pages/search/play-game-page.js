import ipc from 'ipc';
import React from 'react';
import cx from 'classnames';
import { Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Grid, Row, Col, Button, Input, Alert, Well } from 'react-bootstrap';
import { Repeat, List } from 'immutable';
import ReactSlider from 'react-slider';

import GameGrid from '../../components/game-grid';
import SearchIntents from '../../../../browser/intents/search-intents';
import { killChildProcessIntent } from '../../../../browser/intents/common-intents.js';

export default React.createClass({
    mixins: [ ListenerMixin, Navigation ],
    getInitialState() {
        return {
            tiles: this.getEmptyTiles(),
            moves: [],
            isGameDone: false,
            isInProgress: false,
            isWin: false
        };
    },
    componentDidMount() {
        ipc.on(SearchIntents.singleGame.playIntent, this.didPlayGame);
        ipc.on(SearchIntents.singleGame.notifyIntent, this.didNotifyProgress);
    },
    componentWillUnmount() {
        ipc.send(killChildProcessIntent);
    },
    didPlayGame(game) {
        let isWin = List(game.grid.tiles).max() === 11;
        this.setState({
            isGameDone: true,
            isInProgress: false,
            isWin: isWin,
            tiles: game.grid.tiles
        });
    },
    didNotifyProgress(tiles) {
        this.setState({
            moves: this.state.moves.concat([tiles])
        });
    },
    playGame() {
        this.setState({
            isGameDone: false,
            isInProgress: true,
            isWin: false,
            moves: [],
            tiles: this.getEmptyTiles()
        });
        ipc.send(SearchIntents.singleGame.playIntent);
    },
    getEmptyTiles() {
        return Repeat(0, 16).toArray();
    },
    sliderChanged(value) {
        this.setState({
            tiles: this.state.moves[value]
        });
    },
    renderProgressMessage() {
        return this.state.isInProgress ? (
            <Alert bsStyle="info">Game in progress. Moves: {this.state.moves.length}</Alert>
        ) : null;
    },
    renderResultMessage() {
        if (this.state.isGameDone) {
            let style = this.state.isWin ? "success" : "danger";
            let icon = this.state.isWin ? "fa-trophy" : "fa-ban";
            let label = this.state.isWin ? "Win" : "Failed";
            return (
                <Alert bsStyle={style} className="h4"><span className={cx('fa', 'fa-fw', icon)} /> {label}</Alert>
            )
        } else {
            return null;
        }
    },
    renderSlider() {
        return this.state.isGameDone ? (
            <Well>
                <div style={{ marginBottom: 10 }}>
                    <strong>Moves</strong>
                </div>
                <ReactSlider
                    min={0}
                    max={this.state.moves.length - 1}
                    defaultValue={this.state.moves.length - 1}
                    onChange={this.sliderChanged} />
            </Well>
        ) : null;
    },
    render() {
        let progressMessage = this.renderProgressMessage();
        let resultMessage = this.renderResultMessage();
        let slider = this.renderSlider();
        return (
            <div>
                <div className="page-wrapper">
                    <Grid>
                        <Row style={{ marginBottom: 20 }}>
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
                                    <Well className="text-left">
                                        <Button bsStyle="primary" onClick={this.playGame}><span className="fa fa-fw fa-rocket" /> Play</Button>
                                    </Well>
                                </div>
                                <div>
                                    {progressMessage}
                                </div>
                                <div>
                                    {resultMessage}
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col md={6}>
                            <Button onClick={() => this.transitionTo('/search/create')}><span className="fa fa-fw fa-chevron-left" />Back to Create player</Button>
                        </Col>
                        <Col md={6} className="text-right">
                            <Button onClick={() => this.transitionTo('search-winning-rate')}>Winning rate <span className="fa fa-fw fa-chevron-right" /></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});
