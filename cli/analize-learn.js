import fs from 'fs'
import path from 'path'
import stdio from 'stdio'

let options = stdio.getopt({
    id: {
        key: 'i',
        args: 1,
        mandatory: true
    },
    granularity: {
        key: 'g',
        args: 1,
        mandatory: true,
        'default': 1000
    }
});

let id = parseInt(options.id);

fs.readFile(path.resolve(path.join(__dirname, '../../results/', `learn-results-${id}.txt`)), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let granularity = parseInt(options.granularity);
    let games = data.split(':');
    console.log(games.length);
    let resultsNumber = Math.ceil(games.length / granularity);
    for (let i = 0; i < resultsNumber; i++) {
        let start = i * granularity;
        let end = start + granularity;
        let winsCount = games.splice(start, granularity).filter(game => parseInt(game) === 1).length;
        let winningRate = 100 * winsCount / granularity;
        console.log(`${start} - ${end}`, winsCount, `${winningRate}%`);
    }
});
