var casper = require('./casperBase');
var utils = require('utils');
var urlState = {};
var urls = [
    'http://www.google.com',
    'http://www.bing.com',
    'http://www.github.com'
]
var brokenResourceExist = false;

casper.on('resource.received', function (resource) {
    if(resource.stage === 'end' && resource.status > 400) {
        utils.dump(resource.url);
        brokenResourceExist = true;
    }
})

casper.start();
casper.each(urls, function (self, url, index) {
    self.thenOpen(url, function () {
        urlState[url] = brokenResourceExist;
    });
    self.then(function () {
        brokenResourceExist = false;
    })
})
casper.run(function () {
    utils.dump(urlState);
    this.exit();
});