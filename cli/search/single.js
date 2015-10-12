import stdio from 'stdio';
import inquirer from 'inquirer';
import winston from 'winston';
import path from 'path';

import SearchPlayer from '../../src/ai/search/search-player';
import Const from '../../config/const.js';

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: path.join(__dirname, `../../results/search-single.txt`) })
    ]
});

let id = (new Date()).getTime();

let questions = [
    {
        type: 'input',
        name: 'depth',
        message: 'Game tree depth',
        'default': Const.Defaults.Search.Depth
    },
    {
        type: 'input',
        name: 'monotonicity',
        message: 'Monotonicity weight',
        'default': Const.Defaults.Search.Monotonicity
    },
    {
        type: 'input',
        name: 'smoothness',
        message: 'Smoothness weight',
        'default': Const.Defaults.Search.Smoothness
    },
    {
        type: 'input',
        name: 'availability',
        message: 'Availability weight',
        'default': Const.Defaults.Search.Availability
    },
    {
        type: 'input',
        name: 'maximization',
        message: 'Maximization weight',
        'default': Const.Defaults.Search.Maximization
    },
    {
        type: 'input',
        name: 'iterations',
        message: 'Number of iterations',
        'default': 1
    }
];

inquirer.prompt(questions, function(response) {

    let depth = parseInt(response.depth);
    let monotonicity = parseInt(response.monotonicity);
    let smoothness = parseInt(response.smoothness);
    let availability = parseInt(response.availability);
    let maximization = parseInt(response.maximization);
    let iterations = parseInt(response.iterations);
    let searchTree = { depth, monotonicity, smoothness, availability, maximization };
    let player = new SearchPlayer({ searchTree });
    let progressBar = stdio.progressBar(iterations, 1);
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
});
