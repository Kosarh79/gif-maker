# Gif Maker app

## Description
Generates an animated gif file from user's uploaded images all in the front end

## Prerequisite
    You need to install Meteor to build and run the app
    https://www.meteor.com/install


### To Run, build and test
Fork, Clone or download the ZIP

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

 1- To test the application go to the root
 1-1- To run test in the browser
 ```range
 meteor test --driver-package dispatch:mocha-browser
 ```
 2-2- to run tests in the console
 ```range
 meteor test --once --driver-package dispatch:mocha-phantomjs
 ```
 2- To test the meteor-gifmaker package
 ```range
 cd packages/meteor-gifmaker
 meteor test-packages ./ --driver-package practicalmeteor:mocha
```

## Browser Compatibility
Tested in the following browsers/versions:
* Google Chrome 50.0+
* Internet Explorer 11.0+
* Firefox 40.0+

## TODO
gifshot.min.js in the client/compatibility directory of this app is being used by meteor-gifmaker package. Find a way to add it to the package.
