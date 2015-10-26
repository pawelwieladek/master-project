import _ from 'lodash';
import ProgressBar from 'progress';
import moment from 'moment';
import Table from 'cli-table';
import stats from 'stats-lite';
import numeral from 'numeral';

import idsDb from './dbs/ids';
import gamesDb from './dbs/games';
import Form from '../common/form';

export default class LearnComparisonForm extends Form {
    constructor() {
        let learningRates = idsDb('results')
            .chain()
            .map(result => result.learningRate)
            .unique()
            .sort((a, b) => a - b)
            .map(x => JSON.stringify(x))
            .value();

        let questions = [
            {
                type: 'list',
                name: 'learningRate',
                message: 'Learning rates',
                choices: learningRates
            },
            {
                type: 'input',
                name: 'granularity',
                message: 'Granularity',
                'default': 10000
            }
        ];

        let answersHandler = answers => {
            let learningRate = parseFloat(answers.learningRate);
            let ids = idsDb('results')
                .chain()
                .where({ learningRate })
                .pluck('id')
                .value();
            let granularity = parseFloat(answers.granularity);
            let games = gamesDb('results')
                .chain()
                .filter(result => _.contains(ids, result.id))
                .map(result => {
                    return [result.id, result.games];
                })
                .object()
                .value();
            let resultsNumber = Math.ceil(games[ids[0]].length / granularity);
            var table = new Table({
                head: ['Games', 'Mean', 'Stdev'],
                colWidths: [20, 20, 20]
            });
            for (let i = 0; i < resultsNumber; i++) {
                let start = i * granularity;
                let end = start + granularity;
                let winsCounts = ids.map(id => games[id].slice(start, end).filter(game => parseInt(game) === 1).length);
                let winningRates = winsCounts.map(winsCount => 100 * winsCount / granularity);
                table.push([`${start} - ${end}`, numeral(stats.mean(winningRates)).format('0.00'), numeral(stats.stdev(winningRates)).format('0.00')]);
            }
            console.log(table.toString());
        };

        super(questions, answersHandler);
    }
}
