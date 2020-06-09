import {src, dest, config, plugin} from "../../config";


function compilePug() {
    const fileList = [
        `${config.src.pages}**/*.pug`
    ];
    return src(fileList)
        .pipe(plugin.pug({
            pretty: true
        }))
        .pipe(plugin.replace('&lt;', '<'))
        .pipe(plugin.replace('&gt;', '>'))
        .pipe(plugin.rename({
            extname: config.config.ext
        }))
        .pipe(dest(config.build.dir))
}

exports.compilePug = compilePug;
