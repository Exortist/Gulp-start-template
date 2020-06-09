import {config} from "../../config"
import browserSync from "browser-sync"

function serve() {
    browserSync.init({
        server: config.build.dir,
        //proxy: config.config.proxy,
        port: 3000,
        open: false,
        notify: false
    });
    browserSync.watch(config.build.dir, browserSync.reload)
}

exports.serve = serve;
