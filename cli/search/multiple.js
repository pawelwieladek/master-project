import stdio from 'stdio';
import inquirer from 'inquirer';
import ProgressBar from 'progress';
import winston from 'winston';
import path from 'path';

import SearchPlayer from '../../src/ai/search/search-player';
import Const from '../../config/const.js';

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: path.join(__dirname, `../../results/search-multiple.txt`) })
    ]
});

let id = (new Date()).getTime();

let questions = [
    {
        type: 'input',
        name: 'depthFrom',
        message: 'Depth from',
        'default': 3
    },
    {
        type: 'input',
        name: 'depthTo',
        message: 'Depth to',
        'default': 5
    },
    {
        type: 'input',
        name: 'weightFrom',
        message: 'Weight from',
        'default': 1
    },
    {
        type: 'input',
        name: 'weightTo',
        message: 'Weight to',
        'default': 4
    },
    {
        type: 'input',
        name: 'iterations',
        message: 'Number of iterations',
        'default': 20
    }
];

inquirer.prompt(questions, function(response) {
    let depthFrom = parseInt(response.depthFrom);
    let depthTo = parseInt(response.depthTo);
    let weightFrom = parseInt(response.weightFrom);
    let weightTo = parseInt(response.weightTo);
    let iterations = parseInt(response.iterations);
    let gamesNumber = (depthTo - depthFrom + 1) * Math.pow((weightTo - weightFrom + 1), 4) * iterations;
    console.log('gamesNumber', gamesNumber);
    let progressBar = new ProgressBar(':elapseds [:bar] :percent', {
        complete: '=',
        incomplete: ' ',
        width: 50,
        total: gamesNumber
    });
    let start = Math.pow(10, weightFrom);
    let limit = Math.pow(10, weightTo);
    for (let depth = depthFrom; depth <= depthTo; depth++) {
        for (let monotonicity = start; monotonicity <= limit; monotonicity *= 10) {
            for (let smoothness = start; smoothness <= limit; smoothness *= 10) {
                for (let availability = start; availability <= limit; availability *= 10) {
                    for (let maximization = start; maximization <= limit; maximization *= 10) {
                        let searchTree = {
                            depth: parseInt(depth),
                            monotonicity: parseInt(monotonicity),
                            smoothness: parseInt(smoothness),
                            availability: parseInt(availability),
                            maximization: parseInt(maximization)
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
                        logger.info('result', { id, depth, monotonicity, smoothness, availability, maximization, winsCount, iterations, winningRate });
                    }
                }
            }
        }
    }
});
