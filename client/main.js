import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {helper} from './helper';
import './main.html';
import { Session } from 'meteor/session';

Session.set('files', []);
Session.set('errors', []);
Session.set('disableFileSelection', false);

Template.gifmaker.events({
    'change input': (ev) =>{
        helper.handleFileAdd(ev);
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