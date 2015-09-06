import ipc from 'ipc';
import React from 'react';
import { Row, Col, Button, Input, Panel, Tabs, Tab, Alert } from 'react-bootstrap';
import { Repeat, List } from 'immutable';
import ReactSlider from 'react-slider';

import SearchActions from '../../../browser/actions/search-actions';
import GameGrid from '../components/grid';
import CommunicationMixin from '../mixins/communication-mixin';

let SearchPlayerPage = React.createClass({
    mixins: [CommunicationMixin],
    getInitialState() {
        return {
            tiles: Repeat(0, 16).toArray(),
            playGameEnabled: false,
            gameDone: false,
            inProgress: false,
            success: false,
            moves: []
        };
    },
    componentDidMount() {
        this.listenTo(SearchActions.createPlayer, this.didCreatePlayer);
        this.listenTo(SearchActions.playGame, this.didPlayGame);
        this.listenTo(SearchActions.notifyProgress, this.didNotifyProgress);
    },
    didCreatePlayer(tiles) {
        this.setState({
            tiles,
            playGameEnabled: true
        });
    },
    didPlayGame(game) {
        let success = List(game.grid.tiles).max() === 11;
        this.setState({
            gameDone: true,
            inProgress: false,
            success: success,
            tiles: game.grid.tiles
        });
    },
    didNotifyProgress(tiles) {
        this.setState({
            moves: this.state.moves.concat([tiles])
        });
    },
    createPlayer(e) {
        e.preventDefault();
        this.setState({
            playGameEnabled: false,
            gameDone: false,
            inProgress: false,
            success: false,
            moves: []
        });
        this.trigger(SearchActions.createPlayer);
    },
    playGame(e) {
        e.preventDefault();
        this.setState({
            gameDone: false,
            inProgress: true,
            success: false,
            moves: []
        });
        this.trigger(SearchActions.playGame);
    },
    sliderChanged(value) {
        this.setState({
            tiles: this.state.moves[value]
        });
    },
    render() {
        let alert = null;
        let slider = null;
        if (this.state.inProgress) {
            alert = <Alert bsStyle="info">Game in progress. Moves: {this.state.moves.length}</Alert>;
        } else if (this.state.gameDone) {
            if (this.state.success) {
                alert = <Alert bsStyle="success">Win</Alert>;
            } else {
                alert = <Alert bsStyle="danger">Failed</Alert>;
            }
            slider = <ReactSlider min={0} max={this.state.moves.length - 1} defaultValue={0} onChange={this.sliderChanged} />;
        }
        return (
            <Row>
                <Col sm={6}>
                    <Row>
                        <Col xs={12}>
                            <GameGrid tiles={this.state.tiles} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 20 }}>
                        <Col xs={12}>
                            {alert}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            {slider}
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Tabs defaultActiveKey={1} animation={false}>
                        <Tab eventKey={1} title="Create">
                            <Row>
                                <Col sm={6}>
                                    <Input type="text" label="Monotonicity weight" />
                                </Col>
                                <Col sm={6}>
                                    <Input type="text" label="Smoothness weight" />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={6}>
                                    <Input type="text" label="Availability weight" />
                                </Col>
                                <Col sm={6}>
                                    <Input type="text" label="Maximization weight" />
                                </Col>
                            </Row>
                            <Button onClick={this.createPlayer}>Create player</Button>
                        </Tab>
                        <Tab eventKey={2} title="Play" disabled={!this.state.playGameEnabled}>
                            <Button onClick={this.playGame}>Play</Button>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        );
    }
});

export default SearchPlayerPage;