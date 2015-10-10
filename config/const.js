var Const = {
    GridSize: 4,
    GameTypes: {
        Learn: "learn",
        Search: "search"
    },
    OpponentValues: [1, 2],
    Defaults: {
        Search: {
            Depth: 3,
            Monotonicity: 4,
            Smoothness: 4,
            Availability: 3,
            Maximization: 2
        },
        Learn: {
            LearningRate: 0.01
        }
    }
};

module.exports = Const;