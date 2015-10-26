import _ from 'lodash';
import ProgressBar from 'progress';
import stats from 'stats-lite'

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
            }
        ];

        let answersHandler = answers => {
            let ids = answers.ids.map(id => parseInt(id));
            let limit = parseInt(answers.limit);

            let data = ids.reduce((reduction, id) => {
                reduction[id] = db('results').where({ id });
                return reduction;
            }, {});

            let outputs = data[ids[0]].map(input => {
                let { depth, monotonicity, smoothness, availability, maximization } = input;
                let results = ids.map(id => _.findWhere(data[id], { depth, monotonicity, smoothness, availability, maximization })).map(o => o.winningRate);
                let mean = stats.mean(results);
                let stdev = stats.stdev(results);
                return { depth, monotonicity, smoothness, availability, maximization, results, mean, stdev };
            }).sort((a, b) => b.mean - a.mean).slice(0, limit);

            console.log(outputs);
        };

        super(questions, answersHandler);
    }
}
