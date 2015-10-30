import ProgressBar from 'progress';

import db from './dbs/search';
import formBuilder from '../common/form-builder';
import SearchPlayer from '../../src/ai/search/search-player';

export default formBuilder()
    .withQuestions([
        {
            type: 'input',
            name: 'depthFrom',
            message: 'Depth from',
            'default': 4
        },
        {
            type: 'input',
            name: 'depthTo',
            message: 'Depth to',
            'default': 7
        },
        {
            type: 'input',
            name: 'monotonicity',
            message: 'Monotonicity',
            'default': 4
        },
        {
            type: 'input',
            name: 'smoothness',
            message: 'Smoothness',
            'default': 3
        },
        {
            type: 'input',
            name: 'availability',
            message: 'Availability',
            'default': 2
        },
        {
            type: 'input',
            name: 'maximization',
            message: 'Maximization',
            'default': 4
        },
        {
            type: 'input',
            name: 'iterations',
            message: 'Number of iterations',
            'default': 100
        }
    ])
    .withAnswersHandler(answers => {
        let id = (new Date()).getTime();
        let depthFrom = parseInt(answers.depthFrom);
        let depthTo = parseInt(answers.depthTo);
        let monotonicity = parseInt(answers.monotonicity);
        let smoothness = parseInt(answers.smoothness);
        let availability = parseInt(answers.availability);
        let maximization = parseInt(answers.maximization);
        let iterations = parseInt(answers.iterations);
        let gamesNumber = (depthTo - depthFrom + 1) * iterations;
        let progressBar = new ProgressBar(':elapseds [:bar] :current/:total :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 50,
            total: gamesNumber
        });

        for (let depth = depthFrom; depth <= depthTo; depth++) {
            let searchTree = {
                depth,
                monotonicity,
                smoothness,
                availability,
                maximization
            };
            let player = new SearchPlayer({ searchTree });
            let winsCount = 0;
            for (let i = 0; i < iterations; i++) {
                let game = player.play();
                let win = game.grid.max() === 11;
                if (win) {
                    winsCount += 1;
                }
                progressBar.tick();
            }
            let winningRate = winsCount / iterations;
            db('results').push({ id, depth, monotonicity, smoothness, availability, maximization, winsCount, iterations, winningRate });
        }
    })
    .build();