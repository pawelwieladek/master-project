import _ from 'lodash'
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


fs.readFile(path.resolve(path.join(__dirname, '../results/', `learn.txt`)), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let id = parseInt(options.id);
    let granularity = parseInt(options.granularity);
    data = data.split('\n');
    if (data[data.length - 1] === '') delete data[data.length - 1];
    data = data.map(datum => JSON.parse(datum));
    let games = _.findWhere(data, { id }).results;
    let resultsNumber = Math.ceil(games.length / granularity);
    for (let i = 0; i < resultsNumber; i++) {
        let start = i * granularity;
        let end = start + granularity;
        let winsCount = games.slice(start, end).filter(game => parseInt(game) === 1).length;
        let winningRate = 100 * winsCount / granularity;
        console.log(`${start} - ${end}`, winsCount, `${winningRate}%`);
    }
});
