var stdio = require("stdio");

stdio.question('AI type', ['search', 'learn'], function (err, type) {
    if (err) throw err;
    switch (type) {
        case 'search':
            stdio.question('AI type', ['search', 'learn'], function (err, type) {

            });
    }
});