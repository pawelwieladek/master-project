import ProgressBar from 'progress';
import moment from 'moment';

import idsDb from './dbs/ids';
import gamesDb from './dbs/games';
import Form from '../common/form';
import LearnPlayer from '../../src/ai/learn/learn-player';

export default class LearnAnalysisForm extends Form {
    constructor() {
        let options = idsDb('results').map(result => {
            return {
                id: result.id,
                date: moment(result.id).format('YYYY-MM-DD HH:mm'),
                learningRate: result.learningRate
            };
        }).map(option => JSON.stringify(option));

        let questions = [
            {
                type: 'list',
                name: 'options',
                message: 'Option',
                choices: options
            },
            {
                type: 'input',
                name: 'granularity',
                message: 'Granularity',
                'default': 1000
            }
        ];

        let answersHandler = answers => {
            let { id } = JSON.parse(answers.options);
            let granularity = parseFloat(answers.granularity);

            let games = gamesDb('results').find({ id }).games.map(x => parseInt(x));
            let resultsNumber = Math.ceil(games.length / granularity);
            for (let i = 0; i < resultsNumber; i++) {
                let start = i * granularity;
                let end = start + granularity;
                let winsCount = games.slice(start, end).filter(game => parseInt(game) === 1).length;
                let winningRate = 100 * winsCount / granularity;
                console.log(`${start} - ${end}`, winsCount, `${winningRate}%`);
            }
        };

        super(questions, answersHandler);
    }
}
