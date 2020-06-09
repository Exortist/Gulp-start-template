import {src, dest, plugin, config} from '../../config'



function generateSvgSprite() {
    const svgList = [`${config.src.svg}**/*.svg`];
    console.log()
    return src(svgList)
        .pipe(plugin.svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(plugin.cheerio({
            run: function ($) {
                //$('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        .pipe(plugin.replace('&gt;', '>'))
        .pipe(plugin.svgSprite({
            shape: {
              dest: "./"
            },
            mode: {
                symbol: {
                    sprite: "sprite.svg"
                }
            }
        }))
        .pipe(dest(config.build.svg))

}

exports.generateSvgSprite = generateSvgSprite;
