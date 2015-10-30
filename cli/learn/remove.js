import ids from './dbs/ids';
import games from './dbs/games';
import networks from './dbs/networks';

import formBuilder from '../common/form-builder';

export default formBuilder()
    .withQuestions([
        {
            type: 'input',
            name: 'id',
            message: 'Id'
        }
    ])
    .withAnswersHandler(answers => {
        let id = parseInt(answers.id);
        ids('results').remove({ id });
        games('results').remove({ id });
        networks('results').remove({ id });
    })
    .build();


