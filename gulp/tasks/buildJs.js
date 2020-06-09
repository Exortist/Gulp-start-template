import {config, src, dest} from '../../config'
import webpackStream from "webpack-stream"

const buildLibrary = process.env.BUILD_LIBRARY = !!'yes';

function buildJs() {
    let entryList = [];
    for (let entryListJsKey in config.entryListJs) {
        entryList.push(config.entryListJs[entryListJsKey]);
    }


    if(buildLibrary) entryList['blocks-library'] = `./${config.src.blocks}blocks-library/blocks-library.js`;
    return src(entryList)
        .pipe(webpackStream(require('../../webpack.config')))
        .pipe(dest(`${config.build.js}`));
}

exports.buildJs = buildJs;
