import ipc from 'ipc';
import React from 'react';
import { Navigation } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Row, Col, Button, Input, Alert, Glyphicon, Well } from 'react-bootstrap';
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
        ipc.on(SearchIntents.playGameIntent, this.didPlayGame);
        ipc.on(SearchIntents.notifyProgressIntent, this.didNotifyProgress);
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
        ipc.send(SearchIntents.playGameIntent);
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
                alert = <Alert bsStyle="success">Win</Alert>;
            } else {
                alert = <Alert bsStyle="danger">Failed</Alert>;
            }
            slider = (
                <Well>
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
                <Row style={{ marginBottom: 20 }}>
                    <Col sm={6}>
                        <GameGrid tiles={this.state.tiles} />
                    </Col>
                    <Col sm={6}>
                        <div>
                            {alert}
                        </div>
                        <div>
                            {slider}
                        </div>
                    </Col>
                </Row>
                <Well>
                    <Row>
                        <Col md={6}>
                            <Button onClick={() => this.transitionTo('/search/create')}><Glyphicon glyph="chevron-left" /> Back</Button>
                        </Col>
                        <Col md={6} className="text-right">
                            <Button bsStyle="primary" onClick={this.playGame}>Play</Button>
                        </Col>
                    </Row>
                </Well>
            </div>
        );
    }
});
