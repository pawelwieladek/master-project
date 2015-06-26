var TupleNetwork = require("../../src/reinforcement/tuple-network");
var Grid = require("../../src/core/grid");

describe("tuple network", function() {
    var grid, size, tupleNetwork;
    beforeEach(function() {
        size = 4;
        tupleNetwork = new TupleNetwork(size);
        grid = Grid.from([
            3, 2, 1, 0,
            2, 1, 0, 0,
            1, 0, 0, 0,
            1, 0, 0, 0
        ]);
    });

    it("should create tuples with proper locations", function() {
        expect(tupleNetwork.tuples[0].locations).to.deep.equal([0, 1, 2, 3]);
        expect(tupleNetwork.tuples[1].locations).to.deep.equal([4, 5, 6, 7]);
        expect(tupleNetwork.tuples[2].locations).to.deep.equal([8, 9, 10, 11]);
        expect(tupleNetwork.tuples[3].locations).to.deep.equal([12, 13, 14, 15]);

        expect(tupleNetwork.tuples[4].locations).to.deep.equal([0, 4, 8, 12]);
        expect(tupleNetwork.tuples[5].locations).to.deep.equal([1, 5, 9, 13]);
        expect(tupleNetwork.tuples[6].locations).to.deep.equal([2, 6, 10, 14]);
        expect(tupleNetwork.tuples[7].locations).to.deep.equal([3, 7, 11, 15]);

        expect(tupleNetwork.tuples[8].locations).to.deep.equal([0, 1, 4, 5]);
        expect(tupleNetwork.tuples[9].locations).to.deep.equal([1, 2, 5, 6]);
        expect(tupleNetwork.tuples[10].locations).to.deep.equal([2, 3, 6, 7]);
        expect(tupleNetwork.tuples[11].locations).to.deep.equal([4, 5, 8, 9]);
        expect(tupleNetwork.tuples[12].locations).to.deep.equal([5, 6, 9, 10]);
        expect(tupleNetwork.tuples[13].locations).to.deep.equal([6, 7, 10, 11]);
        expect(tupleNetwork.tuples[14].locations).to.deep.equal([8, 9, 12, 13]);
        expect(tupleNetwork.tuples[15].locations).to.deep.equal([9, 10, 13, 14]);
        expect(tupleNetwork.tuples[16].locations).to.deep.equal([10, 11, 14, 15]);
    });

    describe("should get location values", function() {

        it("for horizontal tuple", function() {
            // given
            var locations = [0, 1, 2, 3];

            // when
            var locationValues = tupleNetwork.getLocationValues(grid, locations);

            // then
            expect(locationValues).to.deep.equal([3, 2, 1, 0]);
        });

        it("for vertical tuple", function() {
            // given
            var locations = tupleNetwork.tuples[4].locations;

            // when
            var locationValues = tupleNetwork.getLocationValues(grid, locations);

            // then
            expect(locationValues).to.deep.equal([3, 2, 1, 1]);
        });

        it("for square tuple", function() {
            // given
            var locations = tupleNetwork.tuples[14].locations;

            // when
            var locationValues = tupleNetwork.getLocationValues(grid, locations);

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
            tupleNetwork.tuples[0].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[0].locations), 2);
            tupleNetwork.tuples[5].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[5].locations), 3);
            tupleNetwork.tuples[11].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[11].locations), 4);

            // when
            var networkValue = tupleNetwork.getNetworkValue(grid);

            // then
            expect(networkValue).to.equal(9);
        });
    });

    describe("should get network value", function() {

        it("for weights initialized with zero", function() {
            // when
            tupleNetwork.changeWeights(grid, 1);
            var networkValue = tupleNetwork.getNetworkValue(grid);

            // then
            expect(networkValue).to.equal(17);
        });

        it("for already set weights", function() {
            // given
            tupleNetwork.tuples[0].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[0].locations), 2);
            tupleNetwork.tuples[5].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[5].locations), 3);
            tupleNetwork.tuples[11].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[11].locations), 4);

            // when
            tupleNetwork.changeWeights(grid, 1);
            var networkValue = tupleNetwork.getNetworkValue(grid);

            // then
            expect(networkValue).to.equal(26);
        });

        it("for negative weights", function() {
            // given
            tupleNetwork.tuples[0].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[0].locations), 2);
            tupleNetwork.tuples[5].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[5].locations), 3);
            tupleNetwork.tuples[11].changeWeight(tupleNetwork.getLocationValues(grid, tupleNetwork.tuples[11].locations), 4);

            // when
            tupleNetwork.changeWeights(grid, -1);
            var networkValue = tupleNetwork.getNetworkValue(grid);

            // then
            expect(networkValue).to.equal(-8);
        });
    });
});