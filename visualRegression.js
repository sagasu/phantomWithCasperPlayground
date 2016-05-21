var casper = require('casper').create()
var fs = require('fs')

if(fs.exists('./config.json') && fs.exists('./data.json') ){
    var data = require("./data.json")
    var config = require("./config.json")
}else{
    casper.exit()
}

var urls = data.urls
    //['http://www.google.com', "http://www.bing.com"]
var viewportSizes = config.viewportSizes //[480, 720, 1200]

casper.start()


var counter = 0;
casper.repeat(viewportSizes.length, function () {
    var viewPortSize = viewportSizes[counter]
    // visit each of urls
    casper.viewport(viewPortSize, 1000).each(urls, function (self, item, index) {
        self.thenOpen(item, function () {
            var title = this.getTitle()
            console.log(title)

            // otherwise bing says that it is ready, but some things on a page did not funish loading.
            this.wait(2000, function () {
                this.capture("./images/screenshot/"+index+ "_"+viewPortSize+".png")
            })

        })
    })
    counter += 1
})



casper.run()