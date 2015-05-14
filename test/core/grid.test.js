describe("Grid", function() {
    var Grid = require("../../src/core/grid");
    var Direction = require("../../src/core/direction");
    it("Constructor", function() {
        var grid = new Grid(2);
        expect(grid.size).to.equal(2);
        expect(grid.tiles).to.deep.equal([0, 0, 0, 0]);
    });
    it("Clone", function() {
        var grid = new Grid();
        grid.tiles[0] = 1;
        var clone = grid.clone();
        clone.tiles[0] = 2;
        expect(grid.tiles).not.to.deep.equal(clone.tiles);
    });
    it("Value", function() {
        var grid = new Grid();
        expect(grid.value(0)).to.equal(0);
        grid.tiles[0] = 1;
        expect(grid.value(0)).to.equal(1);
    });
    it("Add", function() {
        var grid = new Grid();
        grid.add(0, 1);
        expect(grid.tiles[0]).to.equal(1);
    });
    it("Remove", function() {
        var grid = new Grid();
        grid.tiles[0] = 1;
        expect(grid.tiles[0]).to.equal(1);
        grid.remove(0);
        expect(grid.tiles[0]).to.equal(0);
    });
    it("Shift Index", function() {
        var grid = new Grid();
        expect(grid.shiftIndex(0, Direction.Up)).to.equal(null);
        expect(grid.shiftIndex(0, Direction.Down)).to.equal(4);
        expect(grid.shiftIndex(0, Direction.Left)).to.equal(null);
        expect(grid.shiftIndex(0, Direction.Right)).to.equal(1);

        expect(grid.shiftIndex(5, Direction.Up)).to.equal(1);
        expect(grid.shiftIndex(5, Direction.Down)).to.equal(9);
        expect(grid.shiftIndex(5, Direction.Left)).to.equal(4);
        expect(grid.shiftIndex(5, Direction.Right)).to.equal(6);

        expect(grid.shiftIndex(3, Direction.Up)).to.equal(null);
        expect(grid.shiftIndex(3, Direction.Down)).to.equal(7);
        expect(grid.shiftIndex(3, Direction.Left)).to.equal(2);
        expect(grid.shiftIndex(3, Direction.Right)).to.equal(null);

        expect(grid.shiftIndex(12, Direction.Up)).to.equal(8);
        expect(grid.shiftIndex(12, Direction.Down)).to.equal(null);
        expect(grid.shiftIndex(12, Direction.Left)).to.equal(null);
        expect(grid.shiftIndex(12, Direction.Right)).to.equal(13);

        expect(grid.shiftIndex(15, Direction.Up)).to.equal(11);
        expect(grid.shiftIndex(15, Direction.Down)).to.equal(null);
        expect(grid.shiftIndex(15, Direction.Left)).to.equal(14);
        expect(grid.shiftIndex(15, Direction.Right)).to.equal(null);
    });
    it("Cells", function() {
        var grid = new Grid(2);
        expect(grid.cells(Direction.Right)).to.deep.equal([0, 1, 2, 3]);
        expect(grid.cells(Direction.Left)).to.deep.equal([3, 2, 1, 0]);
        expect(grid.cells(Direction.Down)).to.deep.equal([0, 2, 1, 3]);
        expect(grid.cells(Direction.Up)).to.deep.equal([3, 1, 2, 0]);
    });
    it("From", function() {
        var grid = Grid.from([
            3, 2, 1, 0,
            2, 1, 0, 0,
            1, 0, 0, 0,
            1, 0, 0, 0
        ]);
        expect(grid.tiles[0]).to.equal(3);
        expect(grid.tiles[1]).to.equal(2);
        expect(grid.tiles[2]).to.equal(1);
        expect(grid.tiles[3]).to.equal(0);
        expect(grid.tiles[4]).to.equal(2);
    });
    describe("Destination", function() {
        it("Right", function() {
            var grid = Grid.from([
                0, 1, 1, 1,
                1, 2, 1, 0,
                0, 0, 0, 1,
                1, 0, 2, 1
            ]);
            expect(grid.destination(1, Direction.Right)).to.equal(2);
            expect(grid.destination(3, Direction.Right)).to.equal(3);
            expect(grid.destination(6, Direction.Right)).to.equal(7);
            expect(grid.destination(12, Direction.Right)).to.equal(13);
        });
        it("Left", function() {
            var grid = Grid.from([
                0, 1, 1, 1,
                1, 2, 1, 0,
                0, 0, 0, 1,
                1, 0, 2, 1
            ]);
            expect(grid.destination(1, Direction.Left)).to.equal(0);
            expect(grid.destination(3, Direction.Left)).to.equal(2);
            expect(grid.destination(11, Direction.Left)).to.equal(8);
            expect(grid.destination(14, Direction.Left)).to.equal(13);
        });
        it("Up", function() {
            var grid = Grid.from([
                0, 1, 1, 1,
                1, 2, 1, 0,
                0, 0, 0, 1,
                1, 0, 2, 1
            ]);
            expect(grid.destination(1, Direction.Up)).to.equal(1);
            expect(grid.destination(4, Direction.Up)).to.equal(0);
            expect(grid.destination(11, Direction.Up)).to.equal(3);
            expect(grid.destination(14, Direction.Up)).to.equal(10);
            expect(grid.destination(12, Direction.Up)).to.equal(4);
        });
        it("Down", function() {
            var grid = Grid.from([
                0, 1, 1, 1,
                1, 2, 1, 0,
                0, 0, 0, 1,
                1, 0, 2, 1
            ]);
            expect(grid.destination(4, Direction.Down)).to.equal(12);
            expect(grid.destination(5, Direction.Down)).to.equal(13);
            expect(grid.destination(6, Direction.Down)).to.equal(10);
            expect(grid.destination(15, Direction.Down)).to.equal(15);
        });
    });
    describe("Slide", function() {
        it("Case 1", function() {
            var grid = Grid.from([
                3, 2, 1, 0,
                3, 1, 0, 0,
                1, 0, 0, 0,
                1, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Up);
            expect(points).to.equal(6);
            expect(grid.tiles).to.deep.equal([
                4, 2, 1, 0,
                2, 1, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
        });
        it("Case 2", function() {
            var grid = Grid.from([
                2, 0, 2, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Left);
            expect(points).to.equal(3);
            expect(grid.tiles).to.deep.equal([
                3, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
        });
        it("Case 3", function() {
            var grid = Grid.from([
                2, 0, 2, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Right);
            expect(points).to.equal(3);
            expect(grid.tiles).to.deep.equal([
                0, 0, 0, 3,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
        });
        it("Case 4", function() {
            var grid = Grid.from([
                0, 2, 0, 2,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Left);
            expect(points).to.equal(3);
            expect(grid.tiles).to.deep.equal([
                3, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
        });
        it("Case 5", function() {
            var grid = Grid.from([
                2, 2, 2, 2,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Left);
            expect(points).to.equal(6);
            expect(grid.tiles).to.deep.equal([
                3, 3, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
        });
        it("Case 6", function() {
            var grid = Grid.from([
                2, 0, 0, 0,
                2, 0, 0, 0,
                2, 0, 0, 0,
                2, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Down);
            expect(points).to.equal(6);
            expect(grid.tiles).to.deep.equal([
                0, 0, 0, 0,
                0, 0, 0, 0,
                3, 0, 0, 0,
                3, 0, 0, 0
            ]);
        });
        it("Case 7", function() {
            var grid = Grid.from([
                2, 0, 0, 0,
                2, 0, 0, 0,
                2, 0, 0, 0,
                2, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Left);
            expect(points).to.equal(null);
            expect(grid.tiles).to.deep.equal([
                2, 0, 0, 0,
                2, 0, 0, 0,
                2, 0, 0, 0,
                2, 0, 0, 0
            ]);
        });
        it("Case 8", function() {
            var grid = Grid.from([
                3, 2, 1, 0,
                2, 1, 0, 0,
                1, 0, 0, 0,
                1, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Up);
            expect(points).to.equal(2);
            expect(grid.tiles).to.deep.equal([
                3, 2, 1, 0,
                2, 1, 0, 0,
                2, 0, 0, 0,
                0, 0, 0, 0
            ]);
        });
        it("Case 9", function() {
            var grid = Grid.from([
                3, 2, 1, 0,
                2, 1, 0, 0,
                1, 0, 0, 0,
                1, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Down);
            expect(points).to.equal(2);
            expect(grid.tiles).to.deep.equal([
                0, 0, 0, 0,
                3, 0, 0, 0,
                2, 2, 0, 0,
                2, 1, 1, 0
            ]);
        });
        it("Case 10", function() {
            var grid = Grid.from([
                3, 2, 1, 1,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
            var points = grid.slide(Direction.Right);
            expect(points).to.equal(2);
            expect(grid.tiles).to.deep.equal([
                0, 3, 2, 2,
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0
            ]);
        });
    });
    it("Neighbour", function() {
        var grid = Grid.from([
            3, 2, 1, 0,
            2, 1, 0, 0,
            1, 0, 1, 0,
            1, 0, 0, 0
        ]);
        expect(grid.neighbour(5, Direction.Up)).to.equal(1);
        expect(grid.neighbour(5, Direction.Down)).to.equal(null);
        expect(grid.neighbour(5, Direction.Left)).to.equal(4);
        expect(grid.neighbour(5, Direction.Right)).to.equal(null);

        expect(grid.neighbour(0, Direction.Up)).to.equal(null);
        expect(grid.neighbour(0, Direction.Down)).to.equal(4);
        expect(grid.neighbour(0, Direction.Left)).to.equal(null);
        expect(grid.neighbour(0, Direction.Right)).to.equal(1);

        expect(grid.neighbour(10, Direction.Up)).to.equal(2);
        expect(grid.neighbour(10, Direction.Down)).to.equal(null);
        expect(grid.neighbour(10, Direction.Left)).to.equal(8);
        expect(grid.neighbour(10, Direction.Right)).to.equal(null);
    });
    it("To String", function() {
        var grid = Grid.from([
            1, 1, 2, 3,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ]);

        expect(grid.toString()).to.equal("1\t1\t2\t3\n0\t0\t0\t0\n0\t0\t0\t0\n0\t0\t0\t0");
    });
});