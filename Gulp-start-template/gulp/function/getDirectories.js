const fs = require('fs');
import {config} from "../../config";
import {fileExist} from "./fileExist";

function getDirectoriesLibs(ext) {
    let source = config.src.components;
    return fs.readdirSync(source)
        .filter(item => fs.lstatSync(source + item).isDirectory())
        .filter(item => fileExist(source + item + '/' + item + '.' + ext));
}
function getDirectoriesBlocks(ext) {
  let source = config.src.blocks;
  return fs.readdirSync(source)
    .filter(item => fs.lstatSync(source + item).isDirectory())
    .filter(item => fileExist(source + item + '/' + item + '.' + ext));
}

exports.getDirectoriesLibs = getDirectoriesLibs;
exports.getDirectoriesBlocks = getDirectoriesBlocks;
