import _ from 'lodash';
import ProgressBar from 'progress';
import stats from 'stats-lite';
import Table from 'cli-table';
import numeral from 'numeral';

import db from './dbs/search';
import Form from '../common/form';

export default class LearnComparisonScript extends Form {
    constructor() {
        let ids = db('results')
          .chain()
          .pluck('id')
          .unique()
          .map(id => JSON.stringify(id))
          .value();

        let questions = [
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Ids',
                choices: ids
            },
            {
                type: 'input',
                name: 'limit',
                message: 'Limit',
                'default': 10
            },
            {
                type: 'confirm',
                name: 'print',
                message: 'Print for export?',
                'default': false
            }
        ];

        let answersHandler = answers => {
            let ids = answers.ids.map(id => parseInt(id));
            let limit = parseInt(answers.limit);

            try {
                let data = ids.reduce((reduction, id) => {
                    reduction[id] = db('results').where({ id });
                    return reduction;
                }, {});

                let results = data[ids[0]].map(input => {
                    let { depth, monotonicity, smoothness, availability, maximization } = input;
                    let results = ids.map(id => _.findWhere(data[id], { depth, monotonicity, smoothness, availability, maximization })).map(o => o.winningRate);
                    let mean = stats.mean(results);
                    let stdev = stats.stdev(results);
                    return { depth, monotonicity, smoothness, availability, maximization, results, mean, stdev };
                }).sort((a, b) => b.mean - a.mean).slice(0, limit);

                let columns = ['depth', 'monotonicity', 'smoothness', 'availability', 'maximization', 'mean', 'stdev'];
                let table = new Table({
                    head: columns,
                    colWidths: columns.map(c => 15)
                });

                let tableResults = [];
                results.forEach(result => {
                    table.push([
                        result.depth,
                        result.monotonicity,
                        result.smoothness,
                        result.availability,
                        result.maximization,
                        numeral(result.mean).format('0.00'),
                        numeral(result.stdev).format('0.00')
                    ]);
                    tableResults.push([
                        result.depth,
                        result.monotonicity,
                        result.smoothness,
                        result.availability,
                        result.maximization,
                        parseFloat(numeral(result.mean).format('0.00')),
                        parseFloat(numeral(result.stdev).format('0.00'))
                    ]);
                });

                console.log(table.toString());
                if (answers.print) {
                  console.log('Print for export');
                  console.log('--------------');
                  console.log('Table results:', tableResults);
                }
            } catch (e) {
                console.error('This data sets cannot be compared');
            }
        };

        super(questions, answersHandler);
    }
}
