import path from 'path';
import createDb from '../../common/create-db';

export default createDb(path.join(__dirname, `../../../results/search/search.json`));