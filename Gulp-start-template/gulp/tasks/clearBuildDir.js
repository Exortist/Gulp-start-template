import {del, config} from "../../config";

function clearBuildDir() {
        return del(config.build.dir)
}

exports.clearBuildDir = clearBuildDir;

