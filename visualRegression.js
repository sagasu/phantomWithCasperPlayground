var casper = require('casper').create()

var urls = ['http://www.google.com', "http://www.bing.com"]
var viewportSizes = [480, 720, 1200]

casper.start()

// visit each of urls
casper.each(urls, function (self, item, index) {
    self.thenOpen(item, function () {
        var title = this.getTitle()
        console.log(title)

        // otherwise bing says that it is ready, but some things on a page did not funish loading.
        this.wait(2000, function () {
            this.capture("./images/screenshot/"+index+".png")
        })

    })
})

casper.run()