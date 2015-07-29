var chance = require("chance").Chance(new Date());

var Grid = require("./grid");

var Rules = {
    opponentValues: [1, 2],
    winValue: 11,
    getInitialState: function() {
        var state = new Grid();
        state = Rules.addRandomTile(state);
        state = Rules.addRandomTile(state);
        return state;
    },
    addRandomTile: function(grid) {
        var finalState = grid.clone();
        var value = chance.integer({ min: 1, max: 10 }) <= 9 ? 1 : 2;
        var index = chance.pick(finalState.available());
        finalState.add(index, value);
        return finalState;
    },
    computeAfterState: function(grid, direction) {
        var afterState = grid.clone();
        var points = afterState.slide(direction);
        if (points === null) return null;
        return { reward: points, afterState: afterState };
    },
    move: function(grid, direction) {
        var result = Rules.computeAfterState(grid, direction);
        if (result === null) return null;
        var finalState = Rules.addRandomTile(result.afterState);
        return { reward: result.reward, afterState: result.afterState, finalState: finalState };
    }
};

module.exports = Rules;