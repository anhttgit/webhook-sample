// # SimpleServer
// A simple chat bot server

var logger = require('morgan');
var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var request = require('request');
var router = express();

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var server = http.createServer(app);


app.get('/', (req, res) => {
  res.send("Home page. Server running okay.");
});

app.get('/privacy', (req, res) => {
  res.send("My privacy");
});


app.get('/webhook', function(req, res) {
  console.log(req.body);
  res.send(req.body);
//   if (req.query['hub.verify_token'] === 'maxacminh') {
//     res.send(req.query['hub.challenge']);
//   }
  res.send('Error, wrong validation token');
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || "127.0.0.1");

server.listen(app.get('port'));
