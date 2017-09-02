# meteor-gifmaker package

## Description
returns a data url from blob and returns an animated gif from blobs
## Prerequisite
    You need to install Meteor to build and run the app
    https://www.meteor.com/install


### To Run, build and test
Fork, Clone or download the ZIP

## Install dependencies
```range
meteor npm install --save
```

 ## Test
 2- To test the meteor-gifmaker package
 ```range
 meteor test-packages ./ --driver-package practicalmeteor:mocha
```

## TODO
gifshot.min.js being used by this package, however  is stored in client/compatibility of the actual app using this package. There should be a away found to add it to the package.