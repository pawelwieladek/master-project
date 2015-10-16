import fs from 'fs'
import path from 'path'
import stdio from 'stdio'

let options = stdio.getopt({
    id: {
        key: 'i',
        args: 1,
        mandatory: true
    }
});

let id = parseInt(options.id);

fs.readFile(path.resolve(path.join(__dirname, '../results/search.txt')), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let results = data.split('\n');
    if (results[results.length - 1] === '') delete results[results.length - 1];
    results = results.map(datum => JSON.parse(datum)).filter(datum => datum.id === id);
    results = results.sort((a, b) => b.winningRate - a.winningRate).slice(0, 10);
    console.log(results);
});
