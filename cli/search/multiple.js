import stdio from 'stdio';
import inquirer from 'inquirer';
import ProgressBar from 'progress';

import SearchPlayer from '../../src/ai/search/search-player';
import Const from '../../config/const.js';

let defaultFrom = 1;
let defaultTo = 3;

var questions = [
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
        name: 'monotonicityFrom',
        message: 'Monotonicity from',
        'default': defaultFrom
    },
    {
        type: 'input',
        name: 'monotonicityTo',
        message: 'Monotonicity to',
        'default': defaultTo
    },
    {
        type: 'input',
        name: 'smoothnessFrom',
        message: 'Smoothness from',
        'default': defaultFrom
    },
    {
        type: 'input',
        name: 'smoothnessTo',
        message: 'Smoothness to',
        'default': defaultTo
    },
    {
        type: 'input',
        name: 'availabilityFrom',
        message: 'Availability from',
        'default': defaultFrom
    },
    {
        type: 'input',
        name: 'availabilityTo',
        message: 'Availability to',
        'default': defaultTo
    },
    {
        type: 'input',
        name: 'maximizationFrom',
        message: 'Maximization from',
        'default': defaultFrom
    },
    {
        type: 'input',
        name: 'maximizationTo',
        message: 'Maximization to',
        'default': defaultTo
    },
    {
        type: 'input',
        name: 'iterations',
        message: 'Number of iterations',
        'default': 40
    }
];

inquirer.prompt(questions, function(response) {
    let depthFrom = parseInt(response.depthFrom);
    let depthTo = parseInt(response.depthTo);
    let monotonicityFrom = parseInt(response.monotonicityFrom);
    let monotonicityTo = parseInt(response.monotonicityTo);
    let smoothnessFrom = parseInt(response.smoothnessFrom);
    let smoothnessTo = parseInt(response.smoothnessTo);
    let availabilityFrom = parseInt(response.availabilityFrom);
    let availabilityTo = parseInt(response.availabilityTo);
    let maximizationFrom = parseInt(response.maximizationFrom);
    let maximizationTo = parseInt(response.maximizationTo);
    let iterations = parseInt(response.iterations);
    let gamesNumber = (depthTo - depthFrom + 1) *
        (monotonicityTo - monotonicityFrom + 1) *
        (smoothnessTo - smoothnessFrom + 1) *
        (availabilityTo - availabilityFrom + 1) *
        (maximizationTo - maximizationFrom + 1) *
        iterations;
    var progressBar = new ProgressBar(':elapseds [:bar] :percent', {
        complete: '=',
        incomplete: ' ',
        width: 50,
        total: gamesNumber
    });
    let results = [];
    for (let depth = depthFrom; depth <= depthTo; depth++) {
        for (let monotonicity = monotonicityFrom; monotonicity <= monotonicityTo; monotonicity++) {
            for (let smoothness = smoothnessFrom; smoothness <= smoothnessTo; smoothness++) {
                for (let availability = availabilityFrom; availability <= availabilityTo; availability++) {
                    for (let maximization = maximizationFrom; maximization <= maximizationTo; maximization++) {
                        let player = new SearchPlayer({
                            searchTree: {
                                depth: parseInt(depth),
                                monotonicity: parseInt(monotonicity),
                                smoothness: parseInt(smoothness),
                                availability: parseInt(availability),
                                maximization: parseInt(maximization)
                            }
                        });
                        let wins = 0;
                        for (let i = 0; i < iterations; i++) {
                            let game = player.play();
                            if (game.grid.max() === 11) {
                                wins += 1;
                            }
                            progressBar.tick();
                        }
                        results.push({
                            depth,
                            monotonicity,
                            smoothness,
                            availability,
                            maximization,
                            wins,
                            iterations
                        });
                    }
                }
            }
        }
    }
    console.log(results.sort((a, b) => a.wins < b.wins).map(result => {
        return `depth=${result.depth}, monotonicity=${result.monotonicity}, smoothness=${result.smoothness}, availability=${result.availability}, maximization=${result.maximization}, wins=${result.wins}, iterations=${result.iterations}`
    }));
});
