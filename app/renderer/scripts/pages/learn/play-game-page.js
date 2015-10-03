import ipc from 'ipc';
import React from 'react';
import { Navigation, State } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Grid, Row, Col, Button, Input, Alert, Well } from 'react-bootstrap';
import { Repeat, List } from 'immutable';
import ReactSlider from 'react-slider';

import GameGrid from '../../components/game-grid';
import LearnIntents from '../../../../browser/intents/learn-intents';

export default React.createClass({
    mixins: [ ListenerMixin, Navigation, State ],
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
        ipc.on(LearnIntents.playSingleGameIntent, this.didPlayGame);
        ipc.on(LearnIntents.notifySingleGameProgressIntent, this.didNotifyProgress);
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
        ipc.send(LearnIntents.playSingleGameIntent);
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
                            <Button onClick={() => this.transitionTo('learn-results', this.getParams())}><span className="fa fa-fw fa-chevron-left" /> Results</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
});