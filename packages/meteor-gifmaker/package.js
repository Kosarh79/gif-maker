Package.describe({
    name: 'alih:meteor-gifmaker',
    version: '0.0.1',
    // Brief, one-line summary of the package.
    summary: 'return data url for an image and create gif of images',
    // URL to the Git repository containing the source code for this package.
    git: '',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.5.1');
    api.use('ecmascript');
    api.mainModule('client/meteor-gifmaker.js', 'client');
});

Package.onTest(function (api) {
    api.use('ecmascript');
    api.use('alih:meteor-gifmaker');
    api.mainModule('client/meteor-gifmaker.tests.js', 'client');
});
