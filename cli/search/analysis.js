import ProgressBar from 'progress';
import Table from 'cli-table';

import db from './dbs/search';
import Form from '../common/form';

export default class SearchAnalyzeScript extends Form {
    constructor() {
        let ids = db('results')
          .chain()
          .pluck('id')
          .unique()
          .map(id => JSON.stringify(id))
          .value();
        let questions = [
            {
                type: 'list',
                name: 'id',
                message: 'Id',
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
            let id = parseInt(answers.id);
            let limit = parseInt(answers.limit);

            let results = db('results')
              .where({ id })
              .sort((a, b) => b.winningRate - a.winningRate)
              .slice(0, limit);

            let columns = ['depth', 'monotonicity', 'smoothness', 'availability', 'maximization', 'iterations', 'winningRate'];
            var table = new Table({
                head: columns,
                colWidths: columns.map(c => 15)
            });

            results.forEach(result => {
                table.push([
                    result.depth,
                    result.monotonicity,
                    result.smoothness,
                    result.availability,
                    result.maximization,
                    result.iterations,
                    result.winningRate
                ]);
            });

            console.log(table.toString());
        };

        super(questions, answersHandler);
    }
}
