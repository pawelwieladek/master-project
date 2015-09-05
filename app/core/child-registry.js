var Registry = require("./registry");
var SearchActions = require("./search-actions");
var SearchPlayer = require("../src/ai/search/search-player");

var childRegistry = new Registry();

childRegistry.register(SearchActions.createPlayer, function(send) {
    send(SearchActions.createPlayer, SearchPlayer.createPlayer());
});

childRegistry.register(SearchActions.play, function(send, context) {
    var player = SearchPlayer.deserialize(context.state.player);
    var game = player.play(function(state, direction, reward, afterState, finalState) {
        send(SearchActions.progress, finalState);
    });
    send(SearchActions.play, game);
});

module.exports = childRegistry;