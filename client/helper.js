import {Session} from 'meteor/session';
import {gifMaker} from "meteor/meteor-gifmaker";
//add the message either error or info to session
let addMessage = (message, messageType) => {
    //let messages = Session.get('messages');
    message = {
        message: message,
        error: messageType === 'error',
        info: messageType === 'info',
    };
    //  messages.push(message);
    Session.set('message', message);
};
export const helper = {
    handleFileAdd: (files) => {
        let addedFiles = Session.get('files');
        //number of allowed files to be added
        let maxAllowedFiles = Number(Session.get('maxAllowedFiles'));
        let checkFileNumbers = (files) => {
            if (addedFiles.length === maxAllowedFiles) {
                return [];
            }
            else {
                let _files = Array.from(files).slice(0);
                let capacity = maxAllowedFiles - addedFiles.length;
                if (_files.length > capacity) {
                    _files = _files.splice(0, capacity);
                    addMessage(`Sorry! You can't add more than ${maxAllowedFiles} files!`, 'error');
                }
                return _files;
            }
        };

        //check number of allowed files
        files = checkFileNumbers(files);
        if (files.length === 0) {
            return;
        }
        //loop through selected files, read them and add them to Session
        _.each(files, (blob) => {
            let notAcceptablefilesNames = '';
            gifMaker.readFile(blob, (err, src) => {
                if (!err) {
                    addedFiles.push({src});
                    Session.set('files', addedFiles);
                    //check number of allowed files
                    if (addedFiles.length === maxAllowedFiles) {
                        // addMessage(`Great! you added all allowed files. Please hit Animate to receive your gif!`,
                        //    'info');
                        Session.set('disableFileSelection', true);
                    }
                }
                else {
                    notAcceptablefilesNames += blob.name + ', ';
                }
            });
            if (notAcceptablefilesNames) {
                addMessage(`${notAcceptablefilesNames} not acceptable! Sorry!`, 'error');
            }
        });
    },
    animate: (files, duration, width) => {
        if (!files || files.length < 2) {
            return false;
        }
        duration = duration || 5;
        width = width || 400;
        Session.set('animating', true);
        gifMaker.animate(files, duration, width, (err, gif) => {
            Session.set('animating', false);
            if (!err) {
                Session.set('gif', gif);
            }
            else {
                addMessage('Sorry! Something went wrong. Please try again!', 'error');
            }
        });
    }
};