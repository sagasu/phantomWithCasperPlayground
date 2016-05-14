var casper = require("casper").create();

casper.on('remote.message', function (msg) {
    console.log("remote message is: "+ msg);
})

casper.start("http://www.google.com", function () {
    var message = "I am a script context"

    // this is a callback function that will be executed in a context of a remote webpage
    // that's why it passing a value such as message doesn't work
    var title = this.evaluate(function () {
        var title = document.title

        // this will return null, because message is in script context, while here we are in a page context
        // remove message to nicely return the title.
        return title + message
    })
    console.log(title)

    // Here we are passing message to a callback function
    title = this.evaluate(function (message) {
        var title = document.title
        // you can also get title by
        // title = this.getTitle()

        return title + message
    }, message)
    console.log(title)

})

casper.run();