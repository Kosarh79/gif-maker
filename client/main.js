import {Template} from 'meteor/templating';
import {helper} from './helper';
import './main.html';
import {Session} from 'meteor/session';

Session.set('maxAllowedFiles', 2);
Session.set('files', []);
Session.set('message', {});
Session.set('disableFileSelection', false);

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
Template.message.helpers({
    message: () => {
        return Session.get('message');
    }
});