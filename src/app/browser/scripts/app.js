var React = require('react');
var ipc = require('ipc');

var TodoApp = React.createClass({
    getInitialState() {
        return {
            result: 0
        };
    },
    componentDidMount() {
        ipc.on('result', result => {
            this.setState({
                result: result
            })
        });
    },
    handleClick(e) {
        e.preventDefault();
        ipc.send('calculate', this.state.result);
    },
    render() {
        return (
            <div>
                <h3>App</h3>
                <a href="#" onClick={this.handleClick}>Run</a>
                <div>Result: {this.state.result}</div>
            </div>
        );
    }
});

React.render(<TodoApp />, document.body);