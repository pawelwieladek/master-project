describe("Smoothness", function() {
    var Grid = require("../../src/game/grid");
    var smoothness = require("../../src/ai/search/heuristics/smoothness");
    describe("Value", function() {
        it("Case 1", function() {
            var values = [
                2, 1, 0, 0,
                1, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = new Grid(values);
            expect(smoothness(grid)).to.equal(-2);
        });
        it("Case 2", function() {
            var values = [
                2, 1, 2, 1,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = new Grid(values);
            expect(smoothness(grid)).to.equal(-3);
        });
        it("Case 3", function() {
            var values = [
                4, 5, 3, 2,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = new Grid(values);
            expect(smoothness(grid)).to.equal(-4);
        });
        it("Case 4", function() {
            var values = [
                0, 2, 0, 2,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = new Grid(values);
            expect(smoothness(grid)).to.equal(0);
        });
        it("Case 5", function() {
            var values = [
                0, 2, 2, 2,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = new Grid(values);
            expect(smoothness(grid)).to.equal(0);
        });
        it("Case 6", function() {
            var values = [
                3, 1, 1, 2,
                2, 0, 0, 1,
                1, 0, 0, 0,
                0, 0, 0, 0
            ];
            var grid = new Grid(values);
            expect(smoothness(grid)).to.equal(-7);
        });
        it("Case 7", function() {
            var values = [
                0, 1, 5, 0,
                0, 1, 3, 0,
                2, 0, 0, 0,
                0, 2, 1, 5
            ];
            var grid = new Grid(values);
            expect(smoothness(grid)).to.equal(-16);
        });
    });
});