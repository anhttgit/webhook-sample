const express = require("express")
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.text({ type: 'text/plain' }))
    // use the express-static middleware
app.use(express.static("public"))
const fs = require('fs');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sinhviennamcuoivnua@gmail.com',
    pass: '97af321e11d6bebd3be1018bf050dc7def027a6952ba748ba1bb8e49b0037f7a '
  }
});

var mailOptions = {
  from: 'anhttmail@gmail.com',
  to: 'soicodoc16101996@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};



// define the first route
app.get("/webhook", function(req, res) {
   transporter.sendMail({
  from: 'sinhviennamcuoivnua@gmail.com',
  to: 'soicodoc16101996@gmail.com',
  subject: 'Sending Email using Node.js',
  text: req.body
}, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
    res.send("<h1>Hello World!</h1>")
})

app.get("/log", function(req, res) {
    fs.readFile('test.txt', function(err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
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
