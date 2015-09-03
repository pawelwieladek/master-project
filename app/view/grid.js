var React = require("react");
var classnames = require("classnames");

var Grid = React.createClass({
    render() {
        var tiles = this.props.tiles.map((value, index) => {
            var classes = classnames("tile", "tile-" + value);
            var tile = value > 0 ? Math.pow(2, value) : "";
            return <div className={classes} key={"cell-" + index}>{tile}</div>;
        });
        return (
            <div className="grid">{tiles}</div>
        );
    }
});

module.exports = Grid;