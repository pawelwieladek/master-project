var ipc = require('ipc');
var React = require('react');
var { Repeat } = require('immutable');

require("!style!css!sass!../style.scss");

var Grid = require('./grid');

var generateTiles = () => {
    return Repeat(0, 16).toList().map(() => Math.round(Math.random() * 10)).toArray();
};

var App = React.createClass({
    getInitialState() {
        return {
            tiles: generateTiles()
        };
    },
    componentDidMount() {
        ipc.on('response', response => {
            console.log(response);
        });
    },
    generateTiles() {
        this.setState({
            tiles: generateTiles()
        })
    },
    sendAsync(e) {
        e.preventDefault();
        ipc.send('message', 'hello world');
    },
    render() {
        return (
            <div>
                <div>
                    <Grid tiles={this.state.tiles} />
                </div>
                <div className="controls">
                    <button onClick={this.generateTiles}>Generate tiles</button>
                </div>
                <div>
                    <a href="#" onClick={this.sendAsync}>Send async</a>
                </div>
            </div>
        );
    }
});

React.render(<App />, document.body);