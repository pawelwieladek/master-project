import Form from './common/form';
import LearnRunForm from './learn/run';
import LearnAnalysisForm from './learn/analysis';
import SearchRunForm from './search/run';
import SearchAnalysisForm from './search/analysis';
import SearchComparisonForm from './search/comparison';

export default class MainForm extends Form {
    constructor() {
        let questions = [
            {
                type: 'list',
                name: 'algorithm',
                message: 'Algorithm',
                choices: ['search', 'learn']
            },
            {
                type: 'list',
                name: 'command',
                message: 'Command',
                choices: ['run', 'analysis', 'comparison']
            }
        ];

        function createForm(algorithm, command) {
            if (algorithm === 'search' && command === 'run') {
                return new SearchRunForm();
            } else if (algorithm === 'search' && command === 'analysis') {
                return new SearchAnalysisForm();
            } else if (algorithm === 'search' && command === 'comparison') {
                return new SearchComparisonForm();
            } else if (algorithm === 'learn' && command === 'run') {
                return new LearnRunForm();
            } else if (algorithm === 'learn' && command === 'analysis') {
                return new LearnAnalysisForm();
            } else {
                throw new Error('Not implemented');
            }
        }

        let answersHandler = answers => {
            let form = createForm(answers.algorithm, answers.command);
            form.submit();
        };

        super(questions, answersHandler);
    }
}
