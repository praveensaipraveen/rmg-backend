var express = require('express');
var user= require('./users_profile.js'); 
var app = express();

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('db.properties');

var bodyParser = require('body-parser');
app.use(bodyParser.json());






// This responds a POST request for the /add_user page.
app.post('/add_user', function (req, res) {
   console.log("Got an add request for /add_user");
   user.add_user(req,res);
})


// test add_user1
app.post('/add_user1', function (req, res) {
   console.log("Got an add request for /add_user1");
   user.add_user1(req,res);
})

// This responds a GET request for the /list_user page.
app.get('/list_user',function (req, res) {
   console.log("Got a list request for /list_user");
   user.list_user(req,res);  
})



var server = app.listen(80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("listening at http://%s:%s", host, port)
})
