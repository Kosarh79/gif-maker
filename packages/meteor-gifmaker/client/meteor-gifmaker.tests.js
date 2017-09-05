import {gifMaker} from "meteor/alih:meteor-gifmaker";
import {FileReader}  from "meteor/alih:meteor-gifmaker";
import {chai} from 'meteor/practicalmeteor:chai';

describe('meteor gif-maker package', function () {
    before(function () {
        let mockFileReader = function () {
            this.readAsDataURL = function (blob) {
                blob.name = 'awesome';
            }
        };
        sinon.stub(window, "FileReader", mockFileReader);
    });
    beforeEach(function () {

    });

    it('readFile should not accept wrong type', function () {
        let blob = {type: 'image/jpg-'};
        gifMaker.readFile(blob, function (err, file) {
            chai.assert.equal(err.message, "File type not accepted");
        });
    });
    it('readFile should return encoded image', function () {
        let blob = {type: 'image/jpg'};
        gifMaker.readFile(blob);
        chai.assert.equal(blob.name, "awesome");
    });
    it('animate should return error', function () {
        gifMaker.animate([],null, (err)=>{
            chai.assert.equal(err, 'Error! No files!');
        });
    });
    it('animate should return error for no callback', function () {
        try{
            gifMaker.animate();
        }
        catch(e){
            chai.assert.equal(e.message, 'callback is not a function');
        }
    });
});