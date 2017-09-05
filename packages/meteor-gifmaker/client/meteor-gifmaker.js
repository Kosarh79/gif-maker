let gifshot = require('../lib/gifshot.js');
export const gifMaker = {
    //get the blub, do type checking and returns data url of the file
    //@blob Blob object
    //@callback [nodejs callback type] a function that receives err and result
    readFile: (blob, callback) => {
        //acceptable image types
        let imgMimeType = ['image/jpg', 'image/jpeg', 'image/bmp',
            'image/tiff-fx', 'image/gif', 'image/png', 'image/tiff',
            'application/postscript', 'application/eps',
            'application/x-eps', 'image/eps', 'image/x-eps'];
        let fileReader = new FileReader();
        fileReader.onload = () => {
            if (typeof callback === 'function') {
                callback(null, fileReader.result);
            }
        };
        let type = blob.type.toLowerCase();
        if (imgMimeType.indexOf(type) > -1) {
            fileReader.readAsDataURL(blob);
        }
        else {
            callback({message: 'File type not accepted'});
        }
    },
    //@files array of images
    //@duration [optional], 10 = is, default = 5
    //@callback [nodejs callback type] a function that receives err and result
    animate: (files, duration, callback) => {
        if (typeof callback !== 'function') {
            throw new Error('callback is not a function');
        }
        if (!files || files.length === 0) {
            callback('Error! No files!');
            return;
        }
        duration = duration || 5;
        gifshot.createGIF({
            'images': files,
            'frameDuration': duration
        }, function (obj) {
            callback(obj.error, obj.image);
        });
    }
};