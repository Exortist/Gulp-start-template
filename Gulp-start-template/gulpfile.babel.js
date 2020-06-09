'use strict';

import {parallel, series} from "./config";

import {writePugMixinsFile} from "./gulp/function/writePugMixinsFile";
import {writeSassImportsFile} from "./gulp/function/writeSassImportsFile";
import {writeJsRequiresFile} from "./gulp/function/writeJsRequiresFile";


import {clearBuildDir} from "./gulp/tasks/clearBuildDir";
import {compilePug} from "./gulp/tasks/compilePug";
import {compileStyles} from "./gulp/tasks/compileStyles";
import {watchFiles} from "./gulp/tasks/watchFiles";
import {serve} from "./gulp/tasks/serve";
import {buildJs} from "./gulp/tasks/buildJs";
import {img} from "./gulp/tasks/img";
import {copyAssets} from "./gulp/tasks/copyAssets";
import {generateSvgSprite} from "./gulp/tasks/generateSvgSprite";
import {webp} from "./gulp/tasks/webp";



exports.build = series(
    parallel(clearBuildDir, writePugMixinsFile),
    parallel(writeSassImportsFile, writeJsRequiresFile),
    parallel(compilePug, compileStyles, buildJs),
    parallel(copyAssets, img, webp, generateSvgSprite),
);

exports.default = series(
    parallel(clearBuildDir, writePugMixinsFile),
    parallel(writeSassImportsFile, writeJsRequiresFile),
    parallel(compilePug, compileStyles, buildJs),
    parallel(copyAssets, img, webp, generateSvgSprite),
    parallel(watchFiles, serve),
);
