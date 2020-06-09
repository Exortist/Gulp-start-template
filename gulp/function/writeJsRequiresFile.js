import {doNotEditMsg, config} from "../../config";
import {getDirectoriesBlocks, getDirectoriesLibs} from "./getDirectories";

const fs = require('fs');



function writeJsRequiresFile(cb) {
    const jsRequiresList = [];
    config.addJsBefore.forEach(function(src) {
        jsRequiresList.push(src);
    });
    const allLibsWithJsFiles = getDirectoriesLibs('js');
    const allBlocksWithJsFiles = getDirectoriesBlocks('js');
    allLibsWithJsFiles.forEach(function(blockName){
       // if (nth.config.alwaysAddBlocks.indexOf(blockName) == -1) return;

        jsRequiresList.push(`../../template/components/${blockName}/${blockName}.js`)

    });


    allBlocksWithJsFiles.forEach(function(blockName){

        let src = `../../template/blocks/${blockName}/${blockName}.js`;
        //if (nth.blocksFromHtml.indexOf(blockName) == -1) return;
        if (jsRequiresList.indexOf(src) > -1) return;
        jsRequiresList.push(src);
    });
    config.addJsAfter.forEach(function(src) {
        jsRequiresList.push(src);
    });
    let msg = `\n/*!*${doNotEditMsg.replace(/\n /gm,'\n * ').replace(/\n\n$/,'\n */\n\n')}`;
    let jsRequires = msg + '/* global require */\n\n';
    jsRequiresList.forEach(function(src) {
        jsRequires += `require('${src}');\n`;
    });
    jsRequires += msg;
    fs.writeFileSync(`${config.src.js}entry.js`, jsRequires);
    console.log('---------- Write new entry.js');
    cb();
}
exports.writeJsRequiresFile = writeJsRequiresFile;
