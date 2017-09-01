import {Template} from 'meteor/templating';
import {helper} from './helper';
import './main.html';
import {Session} from 'meteor/session';

//number of allowed filed to be selected is 5
Session.set('maxAllowedFiles', 5);
Session.set('files', []);
Session.set('message', {});
Session.set('disableFileSelection', false);
Session.set('gif', '');

Template.gifmaker.onRendered(function () {

    let holder = document.getElementById('holder');
    holder.ondragover = function () {
        this.className = 'hover';
        return false;
    };
    holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();
        helper.handleFileAdd(e.dataTransfer.files);
    };
    let submit = document.getElementById('animate');
    submit.onclick = ()=>{
        let durationElem = document.getElementById('duration');
        //if user doesn't enter any value for frame duration default is 20ms
        let duration = Number(durationElem.value) || 20;
        let files = Session.get('files');
        helper.animate(files, duration, '700');
    };

    let download = document.getElementById('downloadBtn');
    download.onclick = ()=>{
        let gif = Session.get('gif');
        require("downloadjs")(gif, 'image.gif', 'image/gif');
    }
});

Template.gifmaker.events({
    'change input': (ev) => {
        helper.handleFileAdd(ev.target.files);
    },
});

Template.gifmaker.helpers({
    disableFileSelection: () => {
        return Session.get('disableFileSelection');
    }
});
Template.images.helpers({
    images: () => {
        return Session.get('files');
    }
});
Template.gifviewer.helpers({
    gif: () => {
        return Session.get('gif');
    }
});
Template.message.helpers({
    message: () => {
        return Session.get('message');
    }
});
// Template.download.helpers({
//     src: () => {
//         return Session.get('gif');
//     }
// });