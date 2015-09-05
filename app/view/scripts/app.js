var ipc = require('ipc');
var React = require('react');
var { Repeat } = require('immutable');

var SearchActions = require("../../actions/search-actions");
var Grid = require('./grid');

require("!style!css!sass!../styles/style.scss");

var App = React.createClass({
    getInitialState() {
        return {
            tiles: Repeat(0, 16).toArray()
        };
    },
    componentDidMount() {
        ipc.on(SearchActions.createPlayer, tiles => {
            this.setState({
                tiles: tiles
            });
        });
        ipc.on(SearchActions.play, tiles => {
            this.setState({
                tiles: tiles
            });
        });
        ipc.on(SearchActions.progress, tiles => {
            this.setState({
                tiles: tiles
            });
        });
    },
    create(e) {
        e.preventDefault();
        ipc.send(SearchActions.createPlayer);
    },
    play(e) {
        e.preventDefault();
        ipc.send(SearchActions.play);
    },
    render() {
        return (
            <div>
                <div>
                    <Grid tiles={this.state.tiles} />
                </div>
                <div className="controls">
                    <button onClick={this.create}>Create</button>
                    <button onClick={this.play}>Play</button>
                </div>
            </div>
        );
    }
});

React.render(<App />, document.body);