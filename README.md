# Gif Maker app
## Description
Generates an animated gif file from user's uploaded images all in the front end
## Prerequisites
* Node.js https://nodejs.org
* npmjs https://www.npmjs.com
* Meteor https://www.meteor.com/install
## How to get the source code
Fork, clone or download the ZIP
## Install dependencies
```range
meteor npm install --save
```
## Run
 ```range
 meteor
```
View it at http://localhost:3000/
## Test
 Note: In order to run tests, make sure to run console as administrator.
### 1- To test the application go to the root
#### 1-1- To run tests in the browser
 ```range
 meteor test --driver-package dispatch:mocha-browser
 ```
#### 1-2- to run tests in the console
 ```range
 meteor test --once --driver-package dispatch:mocha-phantomjs
 ```
### 2- To test the meteor-gifmaker package
 ```range
 cd packages/meteor-gifmaker
 meteor test-packages ./ --driver-package practicalmeteor:mocha
```
## Browser Compatibility
Tested in the following browsers/versions:
* Google Chrome 60
* Internet Explorer 11
* Firefox 55
* Opera 47