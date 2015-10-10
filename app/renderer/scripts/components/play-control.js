import React, { PropTypes } from 'react';
import cx from 'classnames';
import { Grid, Row, Col, Button, Input, Alert, Well } from 'react-bootstrap';
import { List } from 'immutable';
import ReactSlider from 'react-slider';

import GameGrid from './game-grid';

export default React.createClass({
    propTypes: {
        onPlay: PropTypes.func.isRequired,
        onCurrentStateChanged: PropTypes.array.isRequired,
        currentState: PropTypes.array.isRequired,
        states: PropTypes.array.isRequired,
        done: PropTypes.array.isRequired,
        ongoing: PropTypes.bool.isRequired,
        win: PropTypes.bool.isRequired
    },
    sliderChanged(stateIndex) {
        this.props.onCurrentStateChanged(this.props.states[stateIndex]);
    },
    renderProgressMessage() {
        return this.props.ongoing ? (
            <Alert bsStyle="info">Game in progress... Moves done: {this.props.states.length}</Alert>
        ) : null;
    },
    renderResultMessage() {
        if (this.props.done) {
            let style = this.props.win ? "success" : "danger";
            let icon = this.props.win ? "fa-trophy" : "fa-ban";
            let label = this.props.win ? "Win" : "Failed";
            return (
                <Alert bsStyle={style} className="h4"><span className={cx('fa', 'fa-fw', icon)} /> {label}</Alert>
            )
        } else {
            return null;
        }
    },
    renderSlider() {
        return this.props.done ? (
            <Well>
                <div style={{ marginBottom: 10 }}>
                    <strong>Moves</strong>
                </div>
                <ReactSlider
                    min={0}
                    max={this.props.states.length - 1}
                    defaultValue={this.props.states.length - 1}
                    onChange={this.sliderChanged} />
            </Well>
        ) : null;
    },
    renderPlayButton() {
        let disabled = this.props.ongoing;
        let label = this.props.ongoing ? "Playing..." : "Play";
        return (
            <Button
                bsStyle="primary"
                onClick={this.props.onPlay}
                disabled={disabled}
                block>
                <span className="fa fa-fw fa-rocket" /> {label}
            </Button>
        );
    },
    render() {
        let progressMessage = this.renderProgressMessage();
        let resultMessage = this.renderResultMessage();
        let slider = this.renderSlider();
        let button = this.renderPlayButton();
        return (
            <Grid>
                <Row style={{ marginBottom: 20 }}>
                    <Col sm={6}>
                        <div style={{ marginBottom: 20 }}>
                            <GameGrid tiles={this.props.currentState} />
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div>
                            <Well className="text-left">
                                {button}
                            </Well>
                        </div>
                        <div>
                            {progressMessage}
                        </div>
                        <div>
                            {resultMessage}
                        </div>
                        <div>
                            {slider}
                        </div>
                    </Col>
                </Row>
            </Grid>
        );
    }
});
