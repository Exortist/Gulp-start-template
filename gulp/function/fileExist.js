
const fs = require('fs');

function fileExist(filepath){
    let flag = true;
    try{
        fs.accessSync(filepath, fs.F_OK);
    }catch(e){
        flag = false;
    }
    return flag;
}

exports.fileExist = fileExist;