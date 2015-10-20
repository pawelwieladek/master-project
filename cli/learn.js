import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import winston from 'winston';
import ProgressBar from 'progress';

import LearnPlayer from '../src/ai/learn/learn-player'

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: path.join(__dirname, `../results/learn.txt`) })
    ]
});

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
        'default': 50000
    }
];

let id = (new Date()).getTime();

inquirer.prompt(questions, response => {
    let gamesNumber = parseInt(response.gamesNumber);
    let learningRate = parseFloat(response.learningRate);
    let player = new LearnPlayer({ learningRate });
    let progressBar = new ProgressBar(':elapseds [:bar] :current/:total :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 50,
        total: gamesNumber
    });
    let results = [];
    for (let i = 0; i < gamesNumber; i++) {
        let game = player.play();
        let win = game.grid.max() === 11;
        results.push(win ? '1' : '0');
        progressBar.tick();
    }
    let network = player.tupleNetwork;
    logger.info('result', { id, learningRate, results, network });
});
