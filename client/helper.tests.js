import { chai } from 'meteor/practicalmeteor:chai';
import {helper} from './helper';
import { gifMaker } from "meteor/meteor-gifmaker";
import { Session } from 'meteor/session';

describe('meteor gif-maker', function () {
    before(function(){
        let mockSaveFile = (blob, callback)=>{
            if(blob.type !== 'bad'){
                callback(null, 'filereaderresult');
            }
            else{
                callback({message:'File type not accepted'});
            }
        };
        sinon.stub(gifMaker, "saveFile",mockSaveFile);
    });
    beforeEach(function () {
        Session.set('errors',[]);
        Session.set('files',[]);
    });

    it('should return an error from saveFile', function () {

       let ev = {
           target:{
               files:[
                   {name:'mars.bad', type:'bad'}
               ]
           }
       };
       helper.handleFileAdd(ev);
       let errors = Session.get('errors');
        chai.assert.equal(errors.length, 1);
    });

    it('should save file', function () {
        let ev = {
            target:{
                files:[
                    {name:'mars.good', type:'good'}
                ]
            }
        };
        helper.handleFileAdd(ev);
        let errors = Session.get('errors');
        let files = Session.get('files');
        chai.assert.equal(errors.length, 0);
        chai.assert.equal(files[0].src, 'filereaderresult');
    });
});
