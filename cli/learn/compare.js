import _ from 'lodash';
import ProgressBar from 'progress';
import moment from 'moment';
import Table from 'cli-table';
import stats from 'stats-lite';
import numeral from 'numeral';

import idsDb from './dbs/ids';
import gamesDb from './dbs/games';
import formBuilder from '../common/form-builder';

export default formBuilder()
    .withQuestions([
        {
            type: 'list',
            name: 'learningRate',
            message: 'Learning rates',
            choices: () => idsDb('results')
                .chain()
                .map(result => result.learningRate)
                .unique()
                .sort((a, b) => a - b)
                .map(x => JSON.stringify(x))
                .value()
        },
        {
            type: 'input',
            name: 'granularity',
            message: 'Granularity',
            'default': 10000
        },
        {
            type: 'confirm',
            name: 'print',
            message: 'Print for export?',
            'default': false
        }
    ])
    .withAnswersHandler(answers => {
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
        let table = new Table({
            head: ['Games', 'Mean', 'Stdev'],
            colWidths: [20, 20, 20]
        });
        let chartResults = [];
        let tableResults = [];
        for (let i = 0; i < resultsNumber; i++) {
            let start = i * granularity;
            let end = start + granularity;
            let winsCounts = ids.map(id => games[id].slice(start, end).filter(game => parseInt(game) === 1).length);
            let winningRates = winsCounts.map(winsCount => 100 * winsCount / granularity);
            table.push([`${start} - ${end}`, numeral(stats.mean(winningRates)).format('0.00'), numeral(stats.stdev(winningRates)).format('0.00')]);
            chartResults.push([end, parseFloat(numeral(stats.mean(winningRates)).format('0.00'))]);
            tableResults.push([end, parseFloat(numeral(stats.mean(winningRates)).format('0.00')), parseFloat(numeral(stats.stdev(winningRates)).format('0.00'))]);
        }
        console.log(table.toString());
        if (answers.print) {
            console.log('Print for export');
            console.log('--------------');
            console.log('Chart results:', chartResults);
            console.log('Table results:', tableResults);
        }
    })
    .build();
