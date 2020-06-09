import { doNotEditMsg, config} from "../../config";
import {fileExist} from "./fileExist";
import {getDirectoriesLibs, getDirectoriesBlocks} from "./getDirectories";
import {getArraysDiff} from "./getArraysDiff";

const fs = require('fs');


config.blocksFromHtml = Object.create(config.alwaysAddBlocks); // блоки из конфига сразу добавим в список блоков
config.scssImportsList = []; // список импортов стилей

function writeSassImportsFile(cb) {
  const newScssImportsList = [];
  config.addStyleBefore.forEach(function (src) {
    newScssImportsList.push(src);
  });
  //console.log(newScssImportsList);
  config.alwaysAddBlocks.forEach(function (blockName) {
    if (fileExist(`${config.src.blocks}${blockName}/${blockName}.scss`)) newScssImportsList.push(`${config.src.blocks}${blockName}/${blockName}.scss`);
  });
  let allLibsWithScssFiles = getDirectoriesLibs('scss');


  allLibsWithScssFiles.forEach(function (blockWithScssFile) {
    let url = `${config.src.components}${blockWithScssFile}/${blockWithScssFile}.scss`;
    // if (nth.blocksFromHtml.indexOf(blockWithScssFile) == -1) return;
    if (newScssImportsList.indexOf(url) > -1) return;
    newScssImportsList.push(url);
  });


  let allBlocksWithScssFiles = getDirectoriesBlocks('scss');
  allBlocksWithScssFiles.forEach(function (blockWithScssFile) {
    let url = `${config.src.blocks}${blockWithScssFile}/${blockWithScssFile}.scss`;
    // if (nth.blocksFromHtml.indexOf(blockWithScssFile) == -1) return;
    if (newScssImportsList.indexOf(url) > -1) return;
    newScssImportsList.push(url);
  });


  config.addStyleAfter.forEach(function (src) {
    newScssImportsList.push(src);
  });
  let diff = getArraysDiff(newScssImportsList, config.scssImportsList);
  if (diff.length) {
    let msg = `\n/*!*${doNotEditMsg.replace(/\n /gm, '\n * ').replace(/\n\n$/, '\n */\n\n')}`;
    let styleImports = msg;
    newScssImportsList.forEach(function (src) {
      styleImports += `@import "${src}";\n`;
    });
    styleImports += msg;
    fs.writeFileSync(`${config.src.scss}style.scss`, styleImports);
    console.log('---------- Write new style.scss');
    config.scssImportsList = newScssImportsList;
  }
  cb();
}

exports.writeSassImportsFile = writeSassImportsFile;
