const express = require("express")
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'text/plain' }))
    // use the express-static middleware
app.use(express.static("public"))
const fs = require('fs');

// define the first route
app.get("/webhook", function(req, res) {
    userAction(req.body);
    fs.writeFile("test.txt", req.body, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    res.send("<h1>Hello World!</h1>")
})
const userAction = async(myBody) => {
    const response = await fetch('http://localhost:3000/url', {
        method: 'POST',
        body: myBody, // string or object
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
}


// start the server listening for requests
app.listen(process.env.PORT || 3001,
    () => console.log("Server is running..."));
