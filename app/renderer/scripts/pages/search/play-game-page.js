import ipc from 'ipc';
import React from 'react';
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
    render() {
        let alert = null;
        let slider = null;
        if (this.state.isInProgress) {
            alert = <Alert bsStyle="info">Game in progress. Moves: {this.state.moves.length}</Alert>;
        } else if (this.state.isGameDone) {
            if (this.state.isWin) {
                alert = <Alert bsStyle="success"><span className="fa fa-fw fa-trophy" /> Win</Alert>;
            } else {
                alert = <Alert bsStyle="danger"><span className="fa fa-fw fa-ban" /> Failed</Alert>;
            }
            slider = (
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
            );
        }
        return (
            <div>
                <div className="page-wrapper">
                    <Grid>
                        <Row style={{ marginBottom: 20 }}>
                            <Col sm={6}>
                                <GameGrid tiles={this.state.tiles} />
                            </Col>
                            <Col sm={6}>
                                <div>
                                    <Well className="text-right">
                                        <Button bsStyle="primary" onClick={this.playGame}><span className="fa fa-fw fa-rocket" /> Play</Button>
                                    </Well>
                                </div>
                                <div>
                                    {alert}
                                </div>
                                <div>
                                    {slider}
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className="footer">
                    <Row>
                        <Col md={6}>
                            <Button onClick={() => this.transitionTo('/search/create')}><span className="fa fa-fw fa-chevron-left" /> Create player</Button>
                        </Col>
                        <Col md={6} className="text-right">
                            <Button onClick={() => this.transitionTo('/search/rate')}>Winning rate <span className="fa fa-fw fa-chevron-right" /></Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});
