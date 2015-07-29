describe("Maximization", function() {
    var Grid = require("../../src/game/grid");
    var maximization = require(".././maximization");
    describe("Value", function() {
        it("Case 1", function() {
            var values = [
                0, 1, 5, 0,
                0, 1, 3, 0,
                2, 0, 0, 0,
                0, 2, 1, 5
            ];
            var grid = Grid.from(values);
            expect(maximization(grid)).to.equal(5);
        });
        it("Case 2", function() {
            var values = [
                5, 1, 5, 4,
                6, 1, 3, 2,
                2, 6, 4, 2,
                1, 2, 1, 5
            ];
            var grid = Grid.from(values);
            expect(maximization(grid)).to.equal(6);
        });
        it("Case 3", function() {
            var values = [
                5, 1, 5, 4,
                6, 1, 0, 2,
                2, 0, 4, 2,
                1, 2, 1, 0
            ];
            var grid = Grid.from(values);
            expect(maximization(grid)).to.equal(6);
        });
        it("Case 4", function() {
            var values = [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = Grid.from(values);
            expect(maximization(grid)).to.equal(0);
        });
        it("Case 5", function() {
            var values = [
                5, 1, 5, 4,
                6, 1, 0, 2,
                2, 11, 4, 2,
                1, 2, 1, 0
            ];
            var grid = Grid.from(values);
            expect(maximization(grid)).to.equal(11);
        });
    });
});