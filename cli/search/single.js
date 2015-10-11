import stdio from 'stdio';
import inquirer from 'inquirer';

import SearchPlayer from '../../src/ai/search/search-player';
import Const from '../../config/const.js';

var questions = [
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
    let player = new SearchPlayer({
        searchTree: {
            depth: parseInt(response.depth),
            monotonicity: parseInt(response.monotonicity),
            smoothness: parseInt(response.smoothness),
            availability: parseInt(response.availability),
            maximization: parseInt(response.maximization)
        }
    });

    let iterations = parseInt(response.iterations);
    let progressBar = stdio.progressBar(iterations, 1);
    let wins = 0;
    for (let i = 0; i < iterations; i++) {
        let game = player.play();
        if (game.grid.max() === 11) {
            wins += 1;
        }
        progressBar.tick();
    }
    console.log(wins, iterations);
});
