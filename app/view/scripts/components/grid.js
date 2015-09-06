import React from 'react';
import classnames from 'classnames';

let Grid = React.createClass({
    render() {
        let tiles = this.props.tiles.map((value, index) => {
            let classes = classnames('tile', 'tile-' + value);
            let tile = value > 0 ? Math.pow(2, value) : '';
            return <div className={classes} key={'cell-' + index}>{tile}</div>;
        });
        return (
            <div className='grid'>{tiles}</div>
        );
    }
});

export default Grid;