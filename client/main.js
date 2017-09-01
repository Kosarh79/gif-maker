import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {helper} from './helper';
import './main.html';
import { Session } from 'meteor/session';

Session.set('files', []);
Session.set('errors', []);
Session.set('disableFileSelection', false);

Template.gifmaker.onRendered(function() {
    let holder = document.getElementById('holder'),
        tests = {
            filereader: typeof FileReader != 'undefined',
            dnd: 'draggable' in document.createElement('span'),
            formdata: !!window.FormData,
            progress: "upload" in new XMLHttpRequest
        },
        support = {
            filereader: document.getElementById('filereader'),
            formdata: document.getElementById('formdata'),
            progress: document.getElementById('progress')
        };


    "filereader formdata progress".split(' ').forEach(function (api) {
        if (tests[api] === false) {
            support[api].className = 'fail';
        } else {
            // FFS. I could have done el.hidden = true, but IE doesn't support
            // hidden, so I tried to create a polyfill that would extend the
            // Element.prototype, but then IE10 doesn't even give me access
            // to the Element object. Brilliant.
            support[api].className = 'hidden';
        }
    });

    if (tests.dnd) {
        holder.ondragover = function () { this.className = 'hover'; return false; };
        holder.ondragend = function () { this.className = ''; return false; };
        holder.ondrop = function (e) {
            this.className = '';
            e.preventDefault();
          //  readfiles(e.dataTransfer.files);
            helper.handleFileAdd(e.dataTransfer.files);
        }
    } else {
        fileupload.className = 'hidden';
        fileupload.querySelector('input').onchange = function () {
           // readfiles(this.files);
            helper.handleFileAdd(this.files);
        };
    }

});

Template.gifmaker.events({
    'change input': (ev) =>{
        helper.handleFileAdd(ev.target.files);
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