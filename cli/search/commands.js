import _ from 'lodash';

import formBuilder from '../common/form-builder';
import runWeightsForm from './run-weights';
import runDepthsForm from './run-depths';
import analyzeForm from './analyze';
import compareForm from './compare';

const Commands = {
    RunWeights: 'Run with weights range',
    RunDepths: 'Run with depths range',
    Analyze: 'Analyze',
    Compare: 'Compare'
};

function createForm(command) {
    switch (command) {
        case Commands.RunWeights: return runWeightsForm;
        case Commands.RunDepths: return runDepthsForm;
        case Commands.Analyze: return analyzeForm;
        case Commands.Compare: return compareForm;
        default: throw new Error('Not implemented');
    }
}

export default formBuilder()
    .withQuestions([
        {
            type: 'list',
            name: 'command',
            message: 'Command',
            choices: _.values(Commands)
        }
    ])
    .withAnswersHandler(answers => {
        let form = createForm(answers.command);
        form.submit();
    })
    .build();

