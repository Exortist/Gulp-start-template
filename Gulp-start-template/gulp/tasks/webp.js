import {src, dest, plugin, config} from '../../config';




const fs = require('fs')


function webp() {
    const imgList = [];
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
        .pipe(plugin.webp({quality: 90}))
        .pipe(dest(config.build.img));
}
exports.webp = webp;
