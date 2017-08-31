import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { saveFile } from "meteor/meteor-gifmaker";
import './main.html';
import { Session } from 'meteor/session';
Session.set('files', []);
Session.set('disableFileSelection', false);

Template.gifmaker.events({
    'change input': (ev) =>{
        _.each(ev.target.files, (blob) => {
            saveFile(blob, (err, src)=>{
                if(!err){
                    let files = Session.get('files');
                    files.push({src});
                    Session.set('files', files);
                    if(files.length === 2){
                        Session.set('disableFileSelection', true);
                    }
                }
            })
        });
    }
});

Template.gifmaker.helpers({
    disableFileSelection:()=>{
        return Session.get('disableFileSelection');
    }
});
Template.images.helpers({
    images:()=>{
        return Session.get('files');
    }
});