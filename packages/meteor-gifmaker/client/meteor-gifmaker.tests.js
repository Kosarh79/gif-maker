import { Tinytest } from "meteor/tinytest";
import { gifMaker } from "meteor/meteor-gifmaker";
import { FileReader }  from "meteor/meteor-gifmaker";


Tinytest.add('meteor-gifmaker - example', function (test) {
    let blob = {type:'image/jpg-'};
    gifMaker.saveFile(blob, function(err, file){
        test.equal(err.message, "File type not accepted");
    })

});
