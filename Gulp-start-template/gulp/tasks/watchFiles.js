import {watch, series, config} from "../../config";
import {compilePug} from "./compilePug";
import {compileStyles} from "./compileStyles";
import {writePugMixinsFile} from "../function/writePugMixinsFile";
import {writeSassImportsFile} from "../function/writeSassImportsFile";
import {writeJsRequiresFile} from "../function/writeJsRequiresFile";
import {buildJs} from "./buildJs";
import {copyAssets} from "./copyAssets";
import {generateSvgSprite} from "./generateSvgSprite";
import {img} from "./img";

function watchFiles() {
  watch([`${config.src.blocks}**/*.pug`, `${config.src.components}**/*.pug`, `${config.src.pug}**/*.pug`, `!${config.src.pug}mixins.pug`], series(writePugMixinsFile, compilePug));
  watch([`${config.src.scss}**.scss`, `${config.src.blocks}**/*.scss`, `${config.src.components}**/*.scss`, `!${config.src.scss}_smart-grid.scss`], series(writeSassImportsFile, compileStyles));
  watch([`${config.src.js}**.js`, `${config.src.blocks}**/*.js`, `${config.src.components}**/*.js`, `!${config.src.js}entry.js`], series(writeJsRequiresFile, buildJs));
  watch([`${config.src.img}**/**/*.{png,jpg,jpeg}`], series(img));
  watch([`${config.src.img}**`], series(copyAssets));
  watch([`${config.src.svg}**/*.svg`], series(generateSvgSprite));
  //watch([`${layout.img}**`], series(generateSvgSprite));
}

exports.watchFiles = watchFiles;
