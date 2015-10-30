import ProgressBar from 'progress';

import idsDb from './dbs/ids';
import gamesDb from './dbs/games';
import networkDb from './dbs/networks';
import formBuilder from '../common/form-builder';
import LearnPlayer from '../../src/ai/learn/learn-player';

export default formBuilder()
    .withQuestions([
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
    ])
    .withAnswersHandler(answers => {
        let id = (new Date()).getTime();
        let gamesNumber = parseInt(answers.gamesNumber);
        let learningRate = parseFloat(answers.learningRate);
        let player = new LearnPlayer({ learningRate: learningRate });
        console.log('player.learningRate', player.learningRate);
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
        networkDb('results').push({ id, network });
    })
    .build();
