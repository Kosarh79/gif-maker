
export const gifMaker = {
    saveFile: (blob, callback) => {
        //acceptable image types
        let imgMimeType = ['image/jpg', 'image/jpeg', 'image/bmp', 'image/tiff-fx', 'image/gif', 'image/png', 'image/tiff', 'application/postscript', 'application/eps', 'application/x-eps', 'image/eps', 'image/x-eps'];
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
    animate: (files, duration, width, callback) => {
        gifshot.createGIF({
            'images': files,
            'gifWidth':700,
            'frameDuration':duration
        },function(obj) {
            if(typeof callback === 'function'){
                callback(obj.error, obj.image);
            }
        });
    }
};