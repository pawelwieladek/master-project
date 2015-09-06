import ipc from 'ipc';
import React from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import { Repeat } from 'immutable';

import SearchActions from '../../../actions/search-actions';
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
                    <ButtonGroup vertical>
                        <Button onClick={this.createPlayer}>Create</Button>
                        <Button onClick={this.play}>Play</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        );
    }
});

export default SearchPlayerPage;