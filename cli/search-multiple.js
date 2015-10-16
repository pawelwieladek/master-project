import stdio from 'stdio';
import inquirer from 'inquirer';
import ProgressBar from 'progress';
import winston from 'winston';
import path from 'path';

import SearchPlayer from '../../src/ai/search/search-player';
import Const from '../../config/const.js';

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: path.join(__dirname, `../results/search.txt`) })
    ]
});

let id = (new Date()).getTime();

let questions = [
    {
        type: 'input',
        name: 'depth',
        message: 'Depth',
        'default': 3
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
        'default': 100
    }
];

inquirer.prompt(questions, function(response) {
    let depth = parseInt(response.depth);
    let weightFrom = parseInt(response.weightFrom);
    let weightTo = parseInt(response.weightTo);
    let iterations = parseInt(response.iterations);
    let gamesNumber = Math.pow((weightTo - weightFrom + 1), 4) * iterations;
    console.log('gamesNumber', gamesNumber);
    let progressBar = new ProgressBar(':elapseds [:bar] :current/:total :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 50,
        total: gamesNumber
    });
    let start = weightFrom;
    let limit = weightTo;
      for (let monotonicity = start; monotonicity <= limit; monotonicity++) {
          for (let smoothness = start; smoothness <= limit; smoothness++) {
              for (let availability = start; availability <= limit; availability++) {
                  for (let maximization = start; maximization <= limit; maximization++) {
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
                      logger.info('result', { id, depth, monotonicity, smoothness, availability, maximization, winsCount, iterations, winningRate });
                  }
              }
          }
      }
});
