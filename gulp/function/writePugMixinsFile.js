import {config, doNotEditMsg} from "../../config";
import {getDirectoriesBlocks, getDirectoriesLibs} from "./getDirectories";

const fs = require('fs');

function writePugMixinsFile(cb) {
  let allBlocksWithPugFiles = getDirectoriesBlocks('pug');
  let allLibsWithPugFiles = getDirectoriesLibs('pug');
  let pugMixins = '//-' + doNotEditMsg.replace(/\n /gm, '\n  ');
  allLibsWithPugFiles.forEach(function (blockName) {
    pugMixins += `include ${config.src.components.replace(config.src.src, '../')}${blockName}/${blockName}.pug\n`;
  });
  allBlocksWithPugFiles.forEach(function (blockName) {
    pugMixins += `include ${config.src.blocks.replace(config.src.src, '../')}${blockName}/${blockName}.pug\n`;
  });
  fs.writeFileSync(`${config.src.pug}mixins.pug`, pugMixins);
  cb();
}

exports.writePugMixinsFile = writePugMixinsFile;
