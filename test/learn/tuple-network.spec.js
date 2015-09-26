var TupleNetwork = require(".././tuple-network");
var Grid = require("../../src/game/grid");

var expected = {
    locations: [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [3, 7, 11, 15],
        [0, 1, 4, 5],
        [1, 2, 5, 6],
        [2, 3, 6, 7],
        [4, 5, 8, 9],
        [5, 6, 9, 10],
        [6, 7, 10, 11],
        [8, 9, 12, 13],
        [9, 10, 13, 14],
        [10, 11, 14, 15]
    ]
};

describe("tuple network", function() {
    var grid, tupleNetwork;
    beforeEach(function() {
        tupleNetwork = new TupleNetwork();
        grid = Grid.from([
            3, 2, 1, 0,
            2, 1, 0, 0,
            1, 0, 0, 0,
            1, 0, 0, 0
        ]);
    });

    it("should create tuples with proper locations", function() {
        expect(tupleNetwork.tuples[0].locations).to.deep.equal(expected.locations[0]);
        expect(tupleNetwork.tuples[1].locations).to.deep.equal(expected.locations[1]);
        expect(tupleNetwork.tuples[2].locations).to.deep.equal(expected.locations[2]);
        expect(tupleNetwork.tuples[3].locations).to.deep.equal(expected.locations[3]);
        expect(tupleNetwork.tuples[4].locations).to.deep.equal(expected.locations[4]);
        expect(tupleNetwork.tuples[5].locations).to.deep.equal(expected.locations[5]);
        expect(tupleNetwork.tuples[6].locations).to.deep.equal(expected.locations[6]);
        expect(tupleNetwork.tuples[7].locations).to.deep.equal(expected.locations[7]);
        expect(tupleNetwork.tuples[8].locations).to.deep.equal(expected.locations[8]);
        expect(tupleNetwork.tuples[9].locations).to.deep.equal(expected.locations[9]);
        expect(tupleNetwork.tuples[10].locations).to.deep.equal(expected.locations[10]);
        expect(tupleNetwork.tuples[11].locations).to.deep.equal(expected.locations[11]);
        expect(tupleNetwork.tuples[12].locations).to.deep.equal(expected.locations[12]);
        expect(tupleNetwork.tuples[13].locations).to.deep.equal(expected.locations[13]);
        expect(tupleNetwork.tuples[14].locations).to.deep.equal(expected.locations[14]);
        expect(tupleNetwork.tuples[15].locations).to.deep.equal(expected.locations[15]);
        expect(tupleNetwork.tuples[16].locations).to.deep.equal(expected.locations[16]);
    });

    describe("should get location values", function() {

        it("for horizontal tuple", function() {
            // when
            var locationValues = tupleNetwork.getLocationValues(grid, expected.locations[0]);
            // then
            expect(locationValues).to.deep.equal([3, 2, 1, 0]);
        });

        it("for vertical tuple", function() {
            // when
            var locationValues = tupleNetwork.getLocationValues(grid, expected.locations[4]);
            // then
            expect(locationValues).to.deep.equal([3, 2, 1, 1]);
        });

        it("for square tuple", function() {
            // when
            var locationValues = tupleNetwork.getLocationValues(grid, expected.locations[14]);
            // then
            expect(locationValues).to.deep.equal([1, 0, 1, 0]);
        });
    });

    describe("should get network value", function() {

        it("for weights initialized with zero", function() {
            // when
            var networkValue = tupleNetwork.getNetworkValue(grid);
            // then
            expect(networkValue).to.equal(0);
        });

        it("for already set weights", function() {
            // given
            tupleNetwork.tuples[0].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[0]), 2);
            tupleNetwork.tuples[5].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[5]), 3);
            tupleNetwork.tuples[11].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[11]), 4);

            // when
            var networkValue = tupleNetwork.getNetworkValue(grid);

            // then
            expect(networkValue).to.equal(9);
        });
    });

    describe("should change network weights", function() {

        it("for weights initialized with a value", function() {
            // when
            tupleNetwork.changeWeights(grid, 1);
            var networkValue = tupleNetwork.getNetworkValue(grid);

            // then
            expect(networkValue).to.equal(17);
        });

        it("for already set weights", function() {
            // given
            tupleNetwork.tuples[0].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[0]), 2);
            tupleNetwork.tuples[5].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[5]), 3);
            tupleNetwork.tuples[11].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[11]), 4);

            // when
            tupleNetwork.changeWeights(grid, 1);
            var networkValue = tupleNetwork.getNetworkValue(grid);

            // then
            expect(networkValue).to.equal(26);
        });

        it("for negative weights", function() {
            // given
            tupleNetwork.tuples[0].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[0]), 2);
            tupleNetwork.tuples[5].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[5]), 3);
            tupleNetwork.tuples[11].changeWeight(tupleNetwork.getLocationValues(grid, expected.locations[11]), 4);

            // when
            tupleNetwork.changeWeights(grid, -1);
            var networkValue = tupleNetwork.getNetworkValue(grid);

            // then
            expect(networkValue).to.equal(-8);
        });
    });
});