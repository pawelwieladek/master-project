import path from 'path';
import low from 'lowdb';

export default low(path.join(__dirname, `../../../results/learn/ids.json`), {
    autosave: true,
    async: false
});
