var ipc = require('ipc');
var React = require('react');
var { Repeat } = require('immutable');

require("!style!css!sass!../style.scss");

var Grid = require('./grid');

var App = React.createClass({
    getInitialState() {
        return {
            tiles: Repeat(0, 16).toArray()
        };
    },
    componentDidMount() {
        ipc.on('response', message => {
            switch(message.type) {
                case 'create':
                    this.setState({
                        tiles: message.response.game.grid.tiles
                    });
                    break;
                case 'play':
                    this.setState({
                        tiles: message.response.grid.tiles
                    });
                    break;
                case 'progress':
                    this.setState({
                        tiles: message.response.tiles
                    });
                    break;
            }
        });
    },
    create(e) {
        e.preventDefault();
        ipc.send('message', { type: 'create' });
    },
    play(e) {
        e.preventDefault();
        ipc.send('message', { type: 'play' });
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