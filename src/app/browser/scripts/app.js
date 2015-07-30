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
    handleClick() {
        this.setState({
            tiles: generateTiles()
        })
    },
    render() {
        return (
            <div>
                <div>
                    <Grid tiles={this.state.tiles} />
                </div>
                <div>
                    <button onClick={this.handleClick}>Generate tiles</button>
                </div>
            </div>
        );
    }
});

React.render(<App />, document.body);