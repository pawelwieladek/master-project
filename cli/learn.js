import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import ProgressBar from 'progress';

import LearnPlayer from '../../src/ai/learn/learn-player'

let questions = [
    {
        type: 'input',
        name: 'learningRate',
        message: 'Learning rate',
        'default': 0.002
    },
    {
        type: 'input',
        name: 'games',
        message: 'Number of games',
        'default': 50000
    }
];

let timestamp = (new Date()).getTime();

inquirer.prompt(questions, response => {
    let games = parseInt(response.games);
    let learningRate = parseFloat(response.learningRate);
    let player = new LearnPlayer({ learningRate });
    let progressBar = new ProgressBar(':elapseds [:bar] :current/:total :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 50,
        total: games
    });
    let wins = [];
    for (let i = 0; i < games; i++) {
        let game = player.play();
        let win = game.grid.max() === 11;
        wins.push(win ? '1' : '0');
        progressBar.tick();
    }
    let fileContent = [];
    fileContent.push(`timestamp:${timestamp}:learningRate:${learningRate}`);
    fileContent.push(wins.join(':'));
    fileContent = fileContent.join('\n');
    fs.writeFile(path.resolve(path.join(__dirname, '../results/', `learn-results-${timestamp}.txt`)), fileContent, 'utf8', err => {
        if (err) console.error(err);
    });
    let network = JSON.stringify(player.tupleNetwork);
    fs.writeFile(path.resolve(path.join(__dirname, '../results/', `learn-network-${timestamp}.txt`)), network, 'utf8', err => {
        if (err) console.error(err);
    });
});
