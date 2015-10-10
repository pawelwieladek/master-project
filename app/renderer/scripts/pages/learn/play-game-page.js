import ipc from 'ipc';
import React from 'react';
import { Navigation, State } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Row, Col, Button } from 'react-bootstrap';
import { List } from 'immutable';

import GameGrid from '../../components/game-grid';
import PlayControl from '../../components/play-control';
import LearnIntents from '../../../../browser/intents/learn-intents';

export default React.createClass({
    mixins: [ ListenerMixin, Navigation, State ],
    getInitialState() {
        return {
            currentState: GameGrid.empty,
            states: [],
            done: false,
            ongoing: false,
            win: false
        };
    },
    componentDidMount() {
        ipc.on(LearnIntents.playSingleGameIntent, this.didPlayGame);
        ipc.on(LearnIntents.notifySingleGameProgressIntent, this.didNotifyProgress);
    },
    didPlayGame(game) {
        let win = List(game.grid.tiles).max() === 11;
        this.setState({
            done: true,
            ongoing: false,
            win: win,
            currentState: game.grid.tiles
        });
    },
    didNotifyProgress(tiles) {
        this.setState({
            states: this.state.states.concat([tiles])
        });
    },
    playGame() {
        this.setState({
            done: false,
            ongoing: true,
            win: false,
            states: [],
            currentState: GameGrid.empty
        });
        ipc.send(LearnIntents.playSingleGameIntent);
    },
    currentStateChanged(currentState) {
        this.setState({ currentState });
    },
    render() {
        return (
            <div>
                <div className="page-wrapper">
                    <PlayControl
                        onPlay={this.playGame}
                        onCurrentStateChanged={this.currentStateChanged}
                        states={this.state.states}
                        currentState={this.state.currentState}
                        done={this.state.done}
                        ongoing={this.state.ongoing}
                        win={this.state.win}
                        />
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