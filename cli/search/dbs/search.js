import path from 'path';
import low from 'lowdb';

export default low(path.join(__dirname, `../../../results/search/search.json`), {
    autosave: true,
    async: false
});
