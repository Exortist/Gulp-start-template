import {src, dest, plugin, production, config} from '../../config';
import imageminJpegRecompress from "imagemin-jpeg-recompress";

const fs = require('fs')


function img() {
  const imgList = [];
  let components = fs.readdirSync(config.src.components)
  components.forEach(block => {
    let dirPath = `${config.src.components}${block}/img/**/*.{png,jpg,jpeg}`
    imgList.push(dirPath)
  })
  let blocks = fs.readdirSync(config.src.blocks)
  blocks.forEach(block => {
    let dirPath = `${config.src.blocks}${block}/img/**/*.{png,jpg,jpeg}`
    imgList.push(dirPath)
  })
  for (let item in config.addAssets) {
    if (config.addAssets[item] === 'images') {
      imgList.push(item)
    }
  }
  return src(imgList)
    .pipe(plugin.if(production, plugin.imagemin([
      plugin.imagemin.mozjpeg({progressive: true}),
      imageminJpegRecompress({
        loops: 5,
        min: 65,
        max: 70,
        quality: 'medium'
      }),
      plugin.imagemin.optipng({optimizationLevel: 3}),
    ])))
    .pipe(dest(config.build.dir));
}


exports.img = img;
