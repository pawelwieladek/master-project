import fs from 'fs';
import path from 'path';

let makePath = function makePath(dirPath, mode) {
    try {
        fs.mkdirSync(dirPath, mode);
    } catch (err) {
        if (err && err.errno === -2 && err.code === 'ENOENT') {
            makePath(path.dirname(dirPath), mode);
            makePath(dirPath, mode);
        }
    }
};

export default makePath;