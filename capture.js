var casper = require("casper").create();
casper.start("http://www.google.com", function () {
    this.capture('./output/google.png')
})

casper.thenOpen("http://bing.com", function () {
    this.capture("./output/bing.png")
})

// at the end of run it automatically calls exit()
casper.run();