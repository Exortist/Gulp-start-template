import {config} from '../../config';
import cpy from "cpy";


function copyAssets(cb) {
    for (let item in config.addAssets) {
        if (config.addAssets[item] !== 'images') {
            let dest = `${config.build.dir}${config.addAssets[item]}`;
            cpy(item, dest)
        }
    }
    cb()

}
exports.copyAssets = copyAssets;
