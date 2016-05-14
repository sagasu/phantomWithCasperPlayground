var casper = require("casper").create();

casper.on('remote.message', function (msg) {
    console.log("remote message is: "+ msg);
})

casper.start("http://www.google.com", function () {
    this.fill('form', {q:'hello world!'}, true)
})

casper.wait(1000, function () {
    var data = this.evaluate(function () {
        // google serves different responses to different agents, to check what is my agent
        console.log(window.navigator.userAgent);

        var targetEl = document.querySelectorAll('.g h3 a')
        var data = [];

        console.log(targetEl)
        for (var index = 0; index < targetEl.length; index++){
            var currentEl = targetEl[index]
            var currentLink = currentEl.getAttribute('href')
            var currentTitle = currentEl.text
            var currentItem = {
                'link': currentLink,
                'title': currentTitle,
            }
            data.push(currentItem)
        }
        return data;
    })
    console.log(JSON.stringify(data))
})

// casper.then(function () {
//     this.capture('./output/googleWithQuery.png')
// })

casper.run();