import ProgressBar from 'progress';
import moment from 'moment';
import Table from 'cli-table';
import numeral from 'numeral';

import idsDb from './dbs/ids';
import gamesDb from './dbs/games';
import formBuilder from '../common/form-builder';

const KeyValueSeparator = ' = ';
const ChoiceSeparator = '   ';

export default formBuilder()
    .withQuestions([
        {
            type: 'list',
            name: 'option',
            message: 'Option',
            choices: () => idsDb('results').map(result => {
                    return [
                        [ 'id', result.id ],
                        [ 'date', moment(result.id).format('YYYY-MM-DD HH:mm') ],
                        [ 'learningRate', result.learningRate ]
                    ].map(array => array.join(KeyValueSeparator)).join(ChoiceSeparator);
                })
        },
        {
            type: 'input',
            name: 'granularity',
            message: 'Granularity',
            'default': 20000
        }
    ])
    .withAnswersHandler(answers => {
        let id = parseInt(answers.option.split(ChoiceSeparator)[0].split(KeyValueSeparator)[1]);
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
            let winningRate = winsCount / granularity;
            table.push([`${start + 1} - ${end}`, `${parseFloat(numeral(winningRate).format('0.0000'))}`]);
        }
        console.log(table.toString());
    })
    .build();