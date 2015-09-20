var Config = {
    GridSize: 4,
    GameTypes: {
        Learn: "learn",
        Search: "search"
    },
    Parameters: {
        Search: {
            Depth: {
                Range: [3, 4, 5, 6],
                Default: 3
            },
            Monotonicity: {
                Range: [1, 2, 3, 4],
                Default: 4
            },
            Smoothness: {
                Range: [1, 2, 3, 4],
                Default: 4
            },
            Availability: {
                Range: [1, 2, 3, 4],
                Default: 3
            },
            Maximization: {
                Range: [1, 2, 3, 4],
                Default: 2
            }
        },
        Learn: {
            LearningRate: {
                Range: [1, 0.1, 0.01, 0.001],
                Default: 0.01
            }
        }
    }
};

module.exports = Config;