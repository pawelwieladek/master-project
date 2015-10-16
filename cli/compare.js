import fs from 'fs'
import path from 'path'
import stdio from 'stdio'
import _ from 'lodash'
import stats from 'stats-lite'

let options = stdio.getopt({
    id: {
        key: 'i',
        args: '*',
        mandatory: true
    }
});

fs.readFile(path.resolve(path.join(__dirname, '../results/search.txt')), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    let ids = options.id.map(id => parseInt(id));
    data = data.split('\n');
    if (data[data.length - 1] === '') delete data[data.length - 1];
    data = data.map(datum => JSON.parse(datum));
    data = ids.reduce((reduction, id) => {
      reduction[id] = data.filter(datum => datum.id === id);
      return reduction;
    }, {});
    let inputs = data[ids[0]].map(datum => {
      let { depth, monotonicity, smoothness, availability, maximization } = datum;
      return { depth, monotonicity, smoothness, availability, maximization };
    });
    let outputs = inputs.map(input => {
      let { depth, monotonicity, smoothness, availability, maximization } = input;
      let results = ids.map(id => _.findWhere(data[id], { depth, monotonicity, smoothness, availability, maximization })).map(o => o.winningRate);
      let mean = stats.mean(results);
      let stdev = stats.stdev(results);
      return { depth, monotonicity, smoothness, availability, maximization, results, mean, stdev };
    });
    outputs = outputs.sort((a, b) => b.mean - a.mean).slice(0, 10);
    console.log(outputs);
});
