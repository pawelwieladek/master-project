import React from 'react';

import GameGrid from '../components/game-grid';

export default React.createClass({
    render() {
        let styles = { marginBottom: 20, marginTop: 20 };
        return (
            <div className="text-center">
                <div>Initial grid</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        0, 2, 0, 0,
                        0, 0, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 0
                    ]} />
                </div>
                <div>Before move</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        3, 0, 0, 1,
                        2, 0, 2, 0,
                        2, 1, 1, 0,
                        0, 0, 0, 1
                    ]} />
                </div>
                <div>After move</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        3, 1, 0, 0,
                        3, 0, 0, 0,
                        2, 2, 0, 0,
                        1, 0, 0, 0
                    ]} />
                </div>
                <div>Won game</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        11, 0, 0, 0,
                        7, 0, 1, 0,
                        5, 2, 0, 0,
                        3, 2, 0, 1
                    ]} />
                </div>
                <div>Failed game</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        2, 3, 2, 1,
                        4, 1, 3, 2,
                        2, 5, 4, 3,
                        7, 6, 5, 4
                    ]} />
                </div>
                <div>Monotonicity</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        3, 5, 6, 9,
                        2, 3, 4, 8,
                        1, 2, 3, 5,
                        0, 0, 1, 2
                    ]} />
                </div>
                <div>Smoothness</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        1, 1, 2, 2,
                        2, 0, 2, 0,
                        3, 0, 0, 3,
                        1, 1, 1, 1
                    ]} />
                </div>
                <div>Maximization</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        9, 0, 0, 1,
                        3, 0, 0, 0,
                        3, 1, 2, 0,
                        2, 1, 0, 1
                    ]} />
                </div>
                <div>Availability</div>
                <div style={styles}>
                    <GameGrid tiles={[
                        9, 0, 0, 1,
                        3, 0, 0, 0,
                        1, 0, 2, 0,
                        0, 0, 0, 1
                    ]} />
                </div>
            </div>
        );
    }
});