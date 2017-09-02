import {chai} from 'meteor/practicalmeteor:chai';
import {helper} from './helper';
import {gifMaker} from "meteor/meteor-gifmaker";
import {Session} from 'meteor/session';

describe('meteor gif-maker', function () {
    before(function () {
        let mockReadFile = (blob, callback) => {
            if (blob.type !== 'bad') {
                callback(null, 'filereaderresult');
            }
            else {
                callback({message: 'File type not accepted'});
            }
        };
        let mockAnimate = (files, duration, width, callback) => {
            callback(undefined, 'awesome gif');
        };
        sinon.stub(gifMaker, "readFile", mockReadFile);
        sinon.stub(gifMaker, "animate", mockAnimate);
    });
    beforeEach(function () {
        Session.set('message', {});
        Session.set('files', []);
        Session.set('maxAllowedFiles', 5);
    });

    it('should return an error from saveFile', function () {
        let files = [
            {name: 'mars.bad', type: 'bad'}
        ];
        helper.handleFileAdd(files);
        let message = Session.get('message');
        chai.assert.equal(message.error, true);
    });

    it('should save file', function () {
        let files = [
            {name: 'mars.good', type: 'good'}
        ];
        helper.handleFileAdd(files);
        let message = Session.get('message');
        let _files = Session.get('files');
        chai.assert.equal(message.error, undefined);
        chai.assert.equal(_files[0].src, 'filereaderresult');
    });
    it('should give warning on more than 5 files', function () {
        let files = [
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'}
        ];
        helper.handleFileAdd(files);
        let message = Session.get('message');
        let _files = Session.get('files');
        chai.assert.equal(message.error, true);
        chai.assert.equal(_files[0].src, 'filereaderresult');
    });
    it('should give warning on more than 5 files including already added files', function () {
        let addedFiles = [
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
        ];
        let files = [
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
        ];
        Session.set('files', addedFiles);
        helper.handleFileAdd(files);
        let message = Session.get('message');
        let _files = Session.get('files');
        chai.assert.equal(message.error, true);
        chai.assert.equal(_files[4].src, 'filereaderresult');
    });

    it('should create gif', function () {
        let files = [
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
            {name: 'mars.good', type: 'good'},
        ];

        helper.animate(files);
        let gif = Session.get('gif');
        chai.assert.equal(gif, 'awesome gif');
    });
    it('should return false creating gif', function () {
        let files = [];
        chai.assert.equal(helper.animate(files), false);
    });
});
