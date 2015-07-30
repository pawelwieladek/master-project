var stdio = require("stdio");

stdio.question("Game type", ["contest", "tournament", "league"], function (err, gameType) {
    if (err) throw err;
    switch (gameType) {
        case "contest":
            stdio.question("Player type", ["search", "learn"], function (err, playerType) {
                if (err) throw err;
                switch (playerType) {
                    case "search":

                }
            });
    }
});