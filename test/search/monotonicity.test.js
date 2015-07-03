describe("Monotonicity", function() {
    var Grid = require("../../src/core/grid");
    var monotonicity = require("../../src/search/monotonicity");
    describe("Value", function() {
        it("Case 1", function() {
            var values = [
                3, 2, 1, 0,
                3, 1, 0, 0,
                1, 0, 0, 0,
                1, 0, 0, 0
            ];
            var grid = Grid.from(values);
            expect(monotonicity(grid)).to.equal(0);
        });
        it("Case 2", function() {
            var values = [
                2, 1, 2, 1,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = Grid.from(values);
            expect(monotonicity(grid)).to.equal(-1);
        });
        it("Case 3", function() {
            var values = [
                1, 5, 3, 2,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = Grid.from(values);
            expect(monotonicity(grid)).to.equal(-3);
        });
        it("Case 4", function() {
            var values = [
                1, 5, 3, 2,
                2, 4, 4, 2,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = Grid.from(values);
            expect(monotonicity(grid)).to.equal(-7);
        });
        it("Case 5", function() {
            var values = [
                7, 5, 4, 1,
                5, 4, 3, 1,
                3, 2, 1, 0,
                2, 0, 0, 0
            ];
            var grid = Grid.from(values);
            expect(monotonicity(grid)).to.equal(0);
        });
        it("Case 6", function() {
            var values = [
                2, 0, 2, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = Grid.from(values);
            expect(monotonicity(grid)).to.equal(0);
        });
        it("Case 7", function() {
            var values = [
                3, 1, 1, 2,
                2, 0, 0, 1,
                1, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = Grid.from(values);
            expect(monotonicity(grid)).to.equal(-1);
        });
    });
});