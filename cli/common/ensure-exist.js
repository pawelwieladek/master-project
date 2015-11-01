import fs from 'fs';
import path from 'path';
import touch from 'touch';
import makePath from './make-path';

export default function ensureExist(filepath) {
    let dirname = path.dirname(filepath);
    if (!fs.existsSync(dirname)){
        makePath(dirname);
    }
    touch.sync(filepath);
}