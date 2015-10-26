import program from 'commander';

import LearnRunScript from './learn/run.js';
import LearnAnalyzeScript from './learn/analyze.js';

program
    .version('0.0.1')
    .option('-a, --algorithm [name]', 'Algorithm (learn|search)')
    .option('-c, --command [name]', 'Command (run|analyze)')
    .parse(process.argv);

if (!/^(learn|search)$/.test(program.algorithm)) {
    console.log('Error: Invalid algorithm name.');
    program.help();
}

if (!/^(run|analyze)$/.test(program.command)) {
    console.log('Error: Invalid command name.');
    program.help();
}

function createScript() {
    if (program.algorithm === 'learn' && program.command === 'run') {
        return new LearnRunScript();
    } else if (program.algorithm === 'learn' && program.command === 'analyze') {
        return new LearnAnalyzeScript();
    } else {
        throw new Error('Not implemented');
    }
}

let script = createScript();
script.run();