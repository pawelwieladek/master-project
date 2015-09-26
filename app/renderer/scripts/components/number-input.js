import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import classnames from 'classnames';

let NumberInput = React.createClass({
    displayName: 'NumberInput',
    propTypes: {
        defaultValue: PropTypes.number
    },
    render() {
        return (
            <div className="input-group">
                <input type="text" className="form-control" aria-label="Text input with segmented button dropdown" />
                <div className="input-group-btn">
                    <button type="button" className="btn btn-default">+</button>
                    <button type="button" className="btn btn-default">-</button>
                </div>
            </div>
        );
    }
});

export default NumberInput;