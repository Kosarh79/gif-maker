import { Session } from 'meteor/session';
import { gifMaker } from "meteor/meteor-gifmaker";
export const helper = {
    handleFileAdd:(files)=>{
        _.each(files, (blob) => {
            gifMaker.saveFile(blob, (err, src)=>{
                if(!err){
                    let files = Session.get('files');
                    files.push({src});
                    Session.set('files', files);
                    if(files.length === 2){
                        Session.set('disableFileSelection', true);
                    }
                }
                else{
                    let error = [`${blob.name} is not an acceptable image! Sorry!`];
                    Session.set('errors', error);
                }
            })
        });
    }
};