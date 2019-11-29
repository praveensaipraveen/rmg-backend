var express = require('express');
var user= require('./users_profile.js'); 
var user_activity = require('./user_game_activity');
var admin_rmg= require('./admin_rmg.js'); 
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

app.post('/update_user', function (req, res) {
   console.log("Got an add request for /update_user");
   user.update_user(req,res);
})

app.post('/allow_user',function (req, res) {
   console.log("allow_user request");
   user_activity.allowUser(req,res);  
})

app.post('/is_tournament_valid',function (req, res) {
   console.log("isTournamentValid request");
   user_activity.isTournamentValid(req,res);  
})

app.post('/enter_tournament_game',function(req,res){
   console.log("enter tournament round post request");
   user_activity.enterTournamentGame(req,res);
})

app.post('/submit_score',function(req,res){
   console.log("submit score post request");
   user_activity.submitScore(req,res);
})

app.post('/add_tournament',function (req, res) {
   console.log("add tournament request");
   admin_rmg.addTournament(req,res);  
})

app.get('/list_games',function (req, res) {
   console.log("Got a list request for /list_games");
   admin_rmg.listGames(req,res);  
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("listening at http://%s:%s", host, port)
})