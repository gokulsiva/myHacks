const fs = require('node-fs');
const path = require('path');

const directory = '/Users/gokul-5763/Movies/'; //Directory to process
const mediaFileExtension = ['.mp4', '.mkv'];
const srtExtension = '.srt';

let filesArr;

function getAllFilesList(directory){
    return fs.readdirSync(directory);
}

function getAllFiles(directory, fExtension) {
    try {
        let fileList = getAllFilesList(directory);
        fileList.forEach(file => {
            if(file[0] !== '.') {
                let fPath = path.join(directory, file);
                fPath = fPath.replace(/\s/g, '\ ');
                if( fs.statSync(fPath).isDirectory() ) {
                    getAllFiles(fPath, fExtension);
                } else {
                    var index = file.lastIndexOf(fExtension)
                    if(index > -1 && !file[file.length + index]){
                        filesArr.push(fPath);
                    }
                }
            }
        });
    } 
    catch (error) {
        console.log(error);
    }
}

// filesArr = [];
// getAllFiles(directory, srtExtension);
// console.log(filesArr.length);

function moveSrtFiles() {

    const destination = '/Users/gokul-5763/mediaSrt';
    filesArr = [];
    getAllFiles(directory, srtExtension);
    filesArr.forEach(file => {
        try {
            let fileName = file.slice(file.lastIndexOf('/')+1);
            fs.copyFileSync(file, path.join(destination, fileName));
            fs.unlinkSync(file);
        } catch (error) {
            console.log(error);
        }
    });
}

//moveSrtFiles();


function removeExtensionFromMediaFiles() {
    let result = [];
    mediaFileExtension.forEach(type => {
        filesArr = [];
        getAllFiles(directory, type);
        filesArr.forEach(file => {
            try {
                let rename = file.slice(0, file.lastIndexOf(type));
                fs.renameSync(file, rename);
                result.push({original: file, renamed: rename});
            } catch (error) {
                console.log(error);
            }
        });
    });
    console.log(JSON.stringify(result));
}

//removeExtensionFromMediaFiles();