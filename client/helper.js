import {Session} from 'meteor/session';
import {gifMaker} from "meteor/meteor-gifmaker";
export const helper = {

    handleFileAdd: (files) => {
        let addedFiles = Session.get('files');
        //number of allowed files to be added
        let maxAllowedFiles = Session.get('maxAllowedFiles');
        //add the message either error or info to session
        let addMessage = (message, messageType) => {
            //let messages = Session.get('messages');
            message = {
                message: message,
                error: messageType==='error',
                info: messageType==='info',
            };
          //  messages.push(message);
            Session.set('message', message);
        };
        let checkFileNumbers = (files)=>{
            if (addedFiles.length === maxAllowedFiles) {
                return [];
            }
            else{
                let _files = Array.from(files).slice(0);
                let capacity = maxAllowedFiles - addedFiles;
                if(_files.length > capacity){
                    _files = _files.splice(0, capacity);
                }
                return _files;
            }
        };
        
        //check number of allowed files
        files = checkFileNumbers(files);
        if(files.length === 0){
            addMessage(`Sorry! You can't add more han ${maxAllowedFiles} files!`, 'error');
            return;
        }
        //loop through selected files, read them and add them to Session
        _.each(files, (blob) => {
            let notAcceptablefilesNames='';
            gifMaker.saveFile(blob, (err, src) => {
                if (!err) {
                    addedFiles.push({src});
                    Session.set('files', addedFiles);
                    //check number of allowed files
                    if (addedFiles.length === maxAllowedFiles) {
                        addMessage(`Great! you added all allowed files. Please hit submit to receive your gif!`,
                            'info');
                        Session.set('disableFileSelection', true);
                    }
                }
                else {
                    notAcceptablefilesNames += blob.name + ', ';
                }
            });
            if(notAcceptablefilesNames){
                addMessage(`${notAcceptablefilesNames} not acceptable! Sorry!`, 'error');
            }
        });
    }
};