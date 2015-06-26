var Tuple = require("../../src/reinforcement/tuple");

describe("tuple", function() {
    var locations, tuple;
    beforeEach(function() {
        locations = [0, 1, 2, 3];
        tuple = new Tuple(locations);
    });

    it("should create tuple",  function() {
        expect(tuple.locations).to.deep.equal([0, 1, 2, 3]);
        expect(tuple.lookupTable).to.deep.equal({});
    });

    it("should build key", function() {
        // given
        var values = [0, 3, 2, 1];

        // when
        var key = tuple.buildKey(values);

        // then
        expect(key).to.deep.equal('0:3:2:1');
    });

    describe("should get weight", function() {

        it("initial zero", function() {
            // given
            var values = [0, 3, 2, 1];

            // when
            var weight = tuple.getWeight(values);

            // then
            expect(weight).to.equal(0);
        });

        it("already set weight", function() {
            // given
            var values = [0, 3, 2, 1];
            tuple.lookupTable[tuple.buildKey(values)] = 0.3;

            // when
            var weight = tuple.getWeight(values);

            // then
            expect(tuple.lookupTable['0:3:2:1']).to.equal(0.3);
            expect(weight).to.equal(0.3);
        });
    });

    describe("should change weight", function() {

        it("initial zero", function() {
            // given
            var values = [0, 3, 2, 1];

            // when
            tuple.changeWeight(values, 0.2);
            var weight = tuple.getWeight(values);

            // then
            expect(weight).to.equal(0.2);
        });

        it("already set weight", function() {
            // given
            var values = [0, 3, 2, 1];
            tuple.lookupTable[tuple.buildKey(values)] = 0.3;

            // when
            tuple.changeWeight(values, 0.2);
            var weight = tuple.getWeight(values);

            // then
            expect(weight).to.equal(0.5);
        });
    });
});