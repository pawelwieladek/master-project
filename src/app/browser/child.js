var SearchPlayer = require("../../ai/search/search-player");

process.on('message', function(message) {
    var player;
    switch(message.type) {
        case 'create':
            player = SearchPlayer.createPlayer();
            process.send({ type: 'create', response: player });
            break;
        case 'play':
            player = SearchPlayer.deserialize(message.player);
            var game = player.play(function(state, direction, reward, afterState, finalState) {
                process.send({ type: 'progress', response: finalState });
            });
            console.log(game);
            process.send({ type: 'play', response: game });
            break;
        default:
            throw new Error('Message type not recognized');
    }
});