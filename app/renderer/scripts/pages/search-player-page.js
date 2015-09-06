import ipc from 'ipc';
import React from 'react';
import { Row, Col, Button, Input, Panel, Tabs, Tab } from 'react-bootstrap';
import { Repeat } from 'immutable';

import SearchActions from '../../../browser/actions/search-actions';
import GameGrid from '../components/grid';
import CommunicationMixin from '../mixins/communication-mixin';

let SearchPlayerPage = React.createClass({
    mixins: [CommunicationMixin],
    getInitialState() {
        return {
            tiles: Repeat(0, 16).toArray()
        };
    },
    componentDidMount() {
        this.listenTo(SearchActions.createPlayer, this.updateTiles);
        this.listenTo(SearchActions.play, this.updateTiles);
        this.listenTo(SearchActions.progress, this.updateTiles);
    },
    updateTiles(tiles) {
        this.setState({ tiles });
    },
    createPlayer(e) {
        e.preventDefault();
        this.trigger(SearchActions.createPlayer);
    },
    play(e) {
        e.preventDefault();
        this.trigger(SearchActions.play);
    },
    render() {
        return (
            <Row>
                <Col sm={6}>
                    <GameGrid tiles={this.state.tiles} />
                </Col>
                <Col sm={6}>
                    <Tabs defaultActiveKey={1} animation={false}>
                        <Tab eventKey={1} title='Create'>
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
                        <Tab eventKey={2} title='Play'>
                            <Button onClick={this.play}>Play</Button>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        );
    }
});

export default SearchPlayerPage;