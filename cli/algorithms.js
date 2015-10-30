import _ from 'lodash';
import formBuilder from './common/form-builder';
import searchCommandsForm from './search/commands';
import learnCommandsForm from './learn/commands';

const Algorithms = {
    Search: 'Search',
    Learn: 'Learn'
};

function createForm(algorithm) {
    switch (algorithm) {
        case Algorithms.Search: return searchCommandsForm;
        case Algorithms.Learn: return learnCommandsForm;
        default: throw new Error('Not implemented');
    }
}

export default formBuilder()
    .withQuestions([
        {
            type: 'list',
            name: 'algorithm',
            message: 'Algorithm',
            choices: _.values(Algorithms)
        }
    ])
    .withAnswersHandler(answers => {
        let form = createForm(answers.algorithm);
        form.submit();
    })
    .build();
