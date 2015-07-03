var TestUtils = require("../test-utils");
var Game = require("../../src/game/game");
var Directions = require("../../src/core/direction");

describe("game rules", function () {
    it("should add random tiles", function () {
        // given
        var finalState = {
            available: sinon.spy(function() {
                return [1, 2, 3];
            }),
            add: sinon.spy()
        };
        var grid = {
            clone: sinon.spy(function() {
                return finalState;
            })
        };

        // when
        var state = Game.addRandomTile(grid);
        var indexMatcher = TestUtils.matchNumberWithin(1, 3);
        var valueMatcher = TestUtils.matchNumberWithin(1, 2);

        // then
        expect(state).to.equal(finalState);
        expect(grid.clone).to.have.been.called;
        expect(finalState.add).to.have.been.calledWith(indexMatcher, valueMatcher);
    });
    describe("should compute after state", function () {
        it("with not null slide result", function () {
            // given
            var reward = 2;
            var afterState = {
                slide: sinon.spy(function() {
                    return reward;
                })
            };
            var grid = {
                clone: sinon.spy(function() {
                    return afterState;
                })
            };
            var direction = Directions.Down;

            // when
            var result = Game.computeAfterState(grid, direction);

            // then
            expect(grid.clone).to.have.been.called;
            expect(afterState.slide).to.have.been.calledWith(direction);
            expect(result).to.eql({ reward: reward, afterState: afterState });
        });
        it("with null slide result", function () {
            // given
            var reward = null;
            var afterState = {
                slide: sinon.spy(function() {
                    return reward;
                })
            };
            var grid = {
                clone: sinon.spy(function() {
                    return afterState;
                })
            };
            var direction = Directions.Down;

            // when
            var result = Game.computeAfterState(grid, direction);

            // then
            expect(grid.clone).to.have.been.called;
            expect(afterState.slide).to.have.been.calledWith(direction);
            expect(result).to.eql(null);
        });
    });
});
