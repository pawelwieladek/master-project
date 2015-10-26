import path from 'path';
import low from 'lowdb';

export default low(path.join(__dirname, `../../../results/learn/games.json`), {
    autosave: true,
    async: false
});
