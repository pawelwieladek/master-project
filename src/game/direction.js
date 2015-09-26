var Direction = {
    Up: "Up",
    Down: "Down",
    Right: "Right",
    Left: "Left",
    opposite: function(direction) {
        switch (direction) {
            case Direction.Up: return Direction.Down;
            case Direction.Down: return Direction.Up;
            case Direction.Left: return Direction.Right;
            case Direction.Right: return Direction.Left;
        }
    },
    all: function() {
        return [
            Direction.Up,
            Direction.Down,
            Direction.Left,
            Direction.Right
        ]
    }
};

module.exports = Direction;