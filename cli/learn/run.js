import ProgressBar from 'progress';

import idsDb from './dbs/ids';
import gamesDb from './dbs/games';
import netowrkDb from './dbs/networks';
import RunScript from '../run';
import LearnPlayer from '../../src/ai/learn/learn-player';

export default class LearnRunScript extends RunScript {
    constructor() {
        let questions = [
            {
                type: 'input',
                name: 'learningRate',
                message: 'Learning rate',
                'default': 0.002
            },
            {
                type: 'input',
                name: 'gamesNumber',
                message: 'Number of games',
                'default': 200000
            }
        ];

        let answersHandler = answers => {
            let gamesNumber = parseInt(answers.gamesNumber);
            let learningRate = parseFloat(answers.learningRate);
            let player = new LearnPlayer({ learningRate: this.learningRate });
            let progressBar = new ProgressBar(':elapseds [:bar] :current/:total :percent :etas', {
                complete: '=',
                incomplete: ' ',
                width: 50,
                total: gamesNumber
            });
            let games = [];
            for (let i = 0; i < gamesNumber; i++) {
                let game = player.play();
                let win = game.grid.max() === 11;
                games.push(win ? '1' : '0');
                progressBar.tick();
            }
            let network = player.tupleNetwork;

            idsDb('results').push({ id, learningRate });
            gamesDb('results').push({ id, games });
            netowrkDb('results').push({ id, network });
        };

        super(questions, answersHandler);
    }
}
