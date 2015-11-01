import path from 'path';
import low from 'lowdb';
import ensureExists from './ensure-exist';

export default function createDb(filepath) {
    ensureExists(filepath);
    return low(filepath, {
        autosave: true,
        async: false
    });
}
