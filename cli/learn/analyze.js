import ProgressBar from 'progress';
import moment from 'moment';
import Table from 'cli-table';

import idsDb from './dbs/ids';
import gamesDb from './dbs/games';
import formBuilder from '../common/form-builder';

export default formBuilder()
    .withQuestions([
        {
            type: 'list',
            name: 'options',
            message: 'Option',
            choices: () => idsDb('results').map(result => {
                    return {
                        id: result.id,
                        date: moment(result.id).format('YYYY-MM-DD HH:mm'),
                        learningRate: result.learningRate
                    };
                }).map(option => JSON.stringify(option))
        },
        {
            type: 'input',
            name: 'granularity',
            message: 'Granularity',
            'default': 10000
        }
    ])
    .withAnswersHandler(answers => {
        let { id } = JSON.parse(answers.options);
        let granularity = parseFloat(answers.granularity);

        let games = gamesDb('results').find({ id }).games.map(x => parseInt(x));
        let resultsNumber = Math.ceil(games.length / granularity);
        var table = new Table({
            head: ['Games', 'Winning rate'],
            colWidths: [20, 20]
        });
        for (let i = 0; i < resultsNumber; i++) {
            let start = i * granularity;
            let end = start + granularity;
            let winsCount = games.slice(start, end).filter(game => parseInt(game) === 1).length;
            let winningRate = 100 * winsCount / granularity;
            table.push([`${start} - ${end}`, `${winningRate}%`]);
        }
        console.log(table.toString());
    })
    .build();