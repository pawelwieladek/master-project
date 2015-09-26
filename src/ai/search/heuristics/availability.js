module.exports = function(grid) {
    return -grid.tiles.filter(function(value) { return value !== 0 }).length;
};