import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Button, Input, Glyphicon } from 'react-bootstrap';
import classnames from 'classnames';

let NumberInput = React.createClass({
    displayName: 'NumberInput',
    propTypes: {
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        defaultValue: PropTypes.number
    },
    getDefaultProps() {
        return {
            min: -Infinity,
            max: Infinity,
            step: 1,
            defaultValue: 0,
            label: ''
        }
    },
    getInitialState() {
        return {
            label: this.props.label,
            value: parseFloat(this.props.defaultValue),
            isValid: true,
            errorMessage: ''
        }
    },
    componentWillMount: function() {
        this.debouncedValidate = _.debounce(this.debouncedValidate, 100);
    },
    inputValue() {
        return parseFloat(this.refs['input'].getDOMNode().value);
    },
    getValue() {
        if (!this.validate()) return null;
        return parseFloat(this.state.value);
    },
    add() {
        if (!this.validate()) return;
        this.setState({
            value: parseFloat(this.state.value) + this.props.step
        });
    },
    subtract() {
        if (!this.validate()) return;
        this.setState({
            value: parseFloat(this.state.value) - this.props.step
        });
    },
    validate() {
        let value = this.inputValue();
        if (!_.isNumber(value) || !_.isFinite(value)) {
            this.setState({
                isValid: false,
                errorMessage: 'Enter proper finite number'
            });
            return false;
        }
        if (value < this.props.min) {
            this.setState({
                isValid: false,
                errorMessage: `Enter number greater than ${this.state.min}`
            });
            return false;
        }
        if (value > this.props.max) {
            this.setState({
                isValid: false,
                errorMessage: `Enter number less than ${this.state.max}`
            });
            return false;
        }
        this.setState({
            isValid: true,
            errorMessage: ''
        });
        return true;
    },
    debouncedValidate() {
        this.validate();
    },
    handleChange: function(event) {
        this.debouncedValidate();
        this.setState({ value: event.target.value });
    },
    render() {
        let props = this.props;
        let value = this.state.value;
        let label = this.state.isValid ? this.state.label : this.state.errorMessage;
        let style = this.state.isValid ? "default" : "error";
        let buttonStyle = this.state.isValid ? "default" : "danger";
        delete props.label;
        delete props.value;
        delete props.onChange;
        return (
                <Input bsStyle={style} hasFeedback>
                    <label className="control-label">{label}</label>
                    <div className="input-group">
                        <div className="input-group-btn">
                            <Button bsStyle={buttonStyle} onClick={this.add}><Glyphicon glyph="plus" /></Button>
                            <Button bsStyle={buttonStyle} onClick={this.subtract}><Glyphicon glyph="minus" /></Button>
                        </div>
                        <input type="text" ref="input" className="form-control" onChange={this.handleChange} value={value} />
                    </div>
                </Input>
        );
    }
});

export default NumberInput;