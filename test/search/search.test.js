var Grid = require("../../src/game/grid");
var Direction = require("../../src/game/direction");
var Search = require(".././search");

describe("search", function() {
    describe("Value", function() {
        var search;
        beforeEach(function() {
            search = new Search(2, 1, 1, 1, 1);
            search.minimax = sinon.spy(search.minimax);
            search.playerMoves = sinon.spy(search.playerMoves);
            search.opponentMoves = sinon.spy(search.opponentMoves);
        });
        it("Case 1", function() {
            var values = [
                3, 3, 2, 1,
                3, 2, 1, 1,
                3, 1, 0, 0,
                3, 0, 0, 0
            ];
            var grid = Grid.from(values);
            var result = search.search(grid);
            expect(search.minimax.callCount).to.be.equal(65);
            expect(search.playerMoves.getCall(0).returnValue[0].grid.tiles).to.deep.equal([
                4, 3, 2, 2,
                4, 2, 1, 0,
                0, 1, 0, 0,
                0, 0, 0, 0
            ]);
            expect(search.minimax.getCall(1).args[0].tiles).to.deep.equal([
                4, 3, 2, 2,
                4, 2, 1, 0,
                0, 1, 0, 0,
                0, 0, 0, 0
            ]);
            expect(search.opponentMoves.getCall(0).returnValue.length).to.equal(16);
            expect(search.opponentMoves.getCall(0).returnValue[0].tiles).to.deep.equal([
                4, 3, 2, 2,
                4, 2, 1, 1,
                0, 1, 0, 0,
                0, 0, 0, 0
            ]);
            // TODO: clear tests comments
            //expect(search.minimax.getCall(2).args[0].tiles).to.deep.equal([
            //    0, 0, 0, 0,
            //    0, 3, 0, 0,
            //    4, 2, 2, 0,
            //    4, 1, 1, 2
            //]);
            //expect(search.minimax.getCall(3).args[0].tiles).to.deep.equal([
            //    4, 2, 1, 0,
            //    3, 2, 2, 0,
            //    3, 1, 0, 0,
            //    3, 0, 0, 0
            //]);
            //expect(search.minimax.getCall(4).args[0].tiles).to.deep.equal([
            //    0, 4, 2, 1,
            //    0, 3, 2, 2,
            //    0, 0, 3, 1,
            //    0, 0, 0, 3
            //]);
        });
    });
});