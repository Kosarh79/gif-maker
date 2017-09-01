import {Template} from 'meteor/templating';
import {helper} from './helper';
import './main.html';
import {Session} from 'meteor/session';

Session.set('maxAllowedFiles',2);
Session.set('files', []);
Session.set('messages', []);
Session.set('disableFileSelection', false);

Template.gifmaker.onRendered(function () {
    let holder = document.getElementById('holder');
    let   tests = {
            filereader: typeof FileReader != 'undefined',
            dnd: 'draggable' in document.createElement('span'),
            formdata: !!window.FormData,
            progress: "upload" in new XMLHttpRequest
        };
    let support = {
            filereader: document.getElementById('filereader'),
            formdata: document.getElementById('formdata'),
            progress: document.getElementById('progress')
        };
    "filereader formdata progress".split(' ').forEach((api) => {
        if (tests[api] === false) {
            support[api].className = 'fail';
        } else {
            support[api].className = 'hidden';
        }
    });

    if (tests.dnd) {
        holder.ondragover = function () {
            this.className = 'hover';
            return false;
        };
        holder.ondragend = function () {
            this.className = '';
            return false;
        };
        holder.ondrop = function (e) {
            this.className = '';
            e.preventDefault();
            helper.handleFileAdd(e.dataTransfer.files);
        }
    } else {
        fileupload.className = 'hidden';
        fileupload.querySelector('input').onchange = function () {
            //fires when user adds files
            helper.handleFileAdd(this.files);
        };
    }
});

Template.gifmaker.events({
    'change input': (ev) => {
        helper.handleFileAdd(ev.target.files);
    }
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
Template.messages.helpers({
    messages: () => {
        return Session.get('messages');
    }
});