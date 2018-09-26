const fs = require('node-fs');
const path = require('path');

let filesArr = [];

function getAllFilesList(directory, callback){
    fs.readdir(directory, (err, files) => {
        if(err) {
            console.log('Unable to log:', err);
        }
        callback(files);
    });
}

async function getAllFiles(directory, fExtension, callback) {
    let fileCallBack = async (files) => {
        files.forEach(async file => {
            if(file[0] !== '.') {
                let fPath = path.join(directory, file);
                fPath = fPath.replace(/\s/g, '\ ');
                if(fs.statSync(fPath).isDirectory()){
                    await getAllFiles(fPath, fExtension, callback);
                    console.log(fPath, ' is a directory.');
                } else {
                    var index = file.lastIndexOf(fExtension)
                    if(index > -1 && !file[file.length + index]){
                        filesArr.push(fPath);
                    }
                }
            }
        });
    };
    fileList = await getAllFilesList(directory, fileCallBack);
    callback();
}

(async function(){
    let callback = function() {
        console.log(filesArr);
    }
    await getAllFiles('/Users/gokul-5763/Movies/','.srt', callback);
})();

