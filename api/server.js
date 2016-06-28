// Dependencies
var http = require('http');
var express = require('express');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Express
var app = express();

// Set openshift variables
app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000); // or 8080
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB
console.log('connecting to DB');
// default to a 'localhost' configuration:
var connection_string = 'mongodb://localhost/todo_list';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD && process.env.NODE_ENV !== 'development') {
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connection_string);

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Serve static front end app
app.use(express.static('app'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/app/index.html');
});

// Routes
app.use('/api/v1', require('./routes/api'));

// Start server
http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
