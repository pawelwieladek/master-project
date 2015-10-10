import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Repeat } from 'immutable';

let GameGrid = React.createClass({
    propTypes: {
        disabled: PropTypes.bool
    },
    statics: {
        empty: Repeat(0, 16).toArray()
    },
    render() {
        let tiles = this.props.tiles.map((value, index) => {
            let classes = classnames('tile', 'tile-' + value);
            let tile = value > 0 ? Math.pow(2, value) : '';
            return <div className={classes} key={'cell-' + index}>{tile}</div>;
        });
        return (
            <div className={classnames('grid', { 'disabled': this.props.disabled })}>{tiles}</div>
        );
    }
});

export default GameGrid;