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
Session.set('animating', false);

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

Template.animate.helpers({
    animating: () => {
        return (Session.get('animating'));
    }
});
Template.animate.events({
    'click button': () => {
        let durationElem = document.getElementById('duration');
        let duration = Number(durationElem.value);
        if (!duration) {
            //if user doesn't enter any value for frame duration default is 5ms
            duration = 300;
        }
        else if (duration > 1000) {
            //set the frame duration to be max 1000 if it is greater than 1000
            duration = 1000;
        }
        duration /= 100; //change it to gifShot standard which 10 is i second
        let files = Session.get('files');
        helper.animate(files, duration, '700');
    }
});

Template.download.helpers({
    show: () => {
        if (Session.get('gif')) {
            return true;
        }
    }
});
Template.download.events({
    'click button': () => {
        let gif = Session.get('gif');
        require("downloadjs")(gif, 'image.gif', 'image/gif');
    }
});