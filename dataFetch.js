var casper = require("casper").create();

casper.on('remote.message', function (msg) {
    console.log("remote message is: "+ msg);
})

casper.start("http://www.google.com", function () {
    this.fill('form', {q:'hello world!'}, true)
})

casper.then(function () {
    this.capture('./output/googleWithQuery.png')
})

casper.run();