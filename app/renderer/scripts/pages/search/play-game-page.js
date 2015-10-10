import ipc from 'ipc';
import React from 'react';
import { Navigation, State } from 'react-router';
import { ListenerMixin } from 'reflux';
import { Row, Col, Button } from 'react-bootstrap';
import { List } from 'immutable';

import GameGrid from '../../components/game-grid';
import PlayControl from '../../components/play-control';
import SearchIntents from '../../../../browser/intents/search-intents';
import { killChildProcessIntent } from '../../../../browser/intents/common-intents.js';

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
        ipc.on(SearchIntents.singleGame.playIntent, this.didPlayGame);
        ipc.on(SearchIntents.singleGame.notifyIntent, this.didNotifyProgress);
    },
    componentWillUnmount() {
        ipc.send(killChildProcessIntent);
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
        ipc.send(SearchIntents.singleGame.playIntent);
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
