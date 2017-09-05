# meteor-gifmaker package
## Description
A Meteor package with two functions to return a Data URL from a blob and an animated gif from blobs
## Usage
```range
meteor add meteor-gifmaker
import {gifMaker} from "meteor/meteor-gifmaker";
```
To returns a Dta URL from a blob
```range
//@blob Blob object
//@callback [nodejs callback type] a function that receives err, result
gifmaker.readFile(blob, (err, data_url) => {
    //do something here
});
```
To returns an animated gif from blobs
```range
//@files array of images
//@duration [optional] 10 = is, default = 5
//@callback [nodejs callback type] a function that receives err and result
gifmaker.animate(files, duration, (err, gif) => {
    //do something here
});
```
## Prerequisites
* Node.js https://nodejs.org
* npmjs https://www.npmjs.com
* Meteor https://www.meteor.com/install
### To Run, build and test
Fork, Clone or download the ZIP
## Install dependencies
```range
meteor npm install --save
```
 ## Test
 ```range
 meteor test-packages ./ --driver-package practicalmeteor:mocha
```
## Browser Compatibility
Tested in the following browsers/versions:
* Google Chrome 60
* Internet Explorer 11
* Firefox 55
* Opera 47