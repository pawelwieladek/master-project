import ProgressBar from 'progress';

import db from './dbs/search';
import formBuilder from '../common/form-builder';
import SearchPlayer from '../../src/ai/search/search-player';

export default formBuilder()
    .withQuestions([
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
    ])
    .withAnswersHandler(answers => {
        let id = (new Date()).getTime();
        let depth = parseInt(answers.depth);
        let weightStart = parseInt(answers.weightFrom);
        let weightEnd = parseInt(answers.weightTo);
        let iterations = parseInt(answers.iterations);
        let gamesNumber = Math.pow((weightEnd - weightStart + 1), 4) * iterations;
        let progressBar = new ProgressBar(':elapseds [:bar] :current/:total :percent :etas', {
            complete: '=',
            incomplete: ' ',
            width: 50,
            total: gamesNumber
        });

        for (let monotonicity = weightStart; monotonicity <= weightEnd; monotonicity++) {
            for (let smoothness = weightStart; smoothness <= weightEnd; smoothness++) {
                for (let availability = weightStart; availability <= weightEnd; availability++) {
                    for (let maximization = weightStart; maximization <= weightEnd; maximization++) {
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
                }
            }
        }
    })
    .build();