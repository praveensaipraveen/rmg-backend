var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//var jsonParser = bodyParser.json()

app.use(bodyParser.json());


var mysql = require('mysql')
var db_config= {
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'rmg_1'
 };






// This responds a POST request for the /add_user page.
app.post('/add_user', function (req, res) {
   console.log("Got an add request for /add_user");
   console.log(req.body);
   var user_id="";
   var phone = "";
   var email_id = "";
   var f_name = "";
   var l_name = "";
   var state = "";

   for(var i in req.body){
      switch(i){
            case "user_id":
               user_id=req.body[i];
               break;
            case "phone":
               phone=req.body[i];
               break;
            case "email_id":
               email_id=req.body[i];
               break;
            case "f_name":
               f_name=req.body[i];
               break;
            case "l_name":
               l_name=req.body[i];
               break;
            case "state":
               state=req.body[i];
               break;
      }
      console.log("key:"+i);
      console.log("value:"+req.body[i]);
   }
   
   var connection = mysql.createConnection(db_config);
   connection.connect(function(err) {
      if (err) throw err;
            var insertionQuery="insert into user_profiles(user_id,phone,email_id,f_name,l_name,state)  values('"+user_id+"','"+phone+"','"+email_id+"','"+f_name+"','"+l_name+"','"+state+"')";
            console.log(insertionQuery);
            connection.query(insertionQuery, function (err, rows, fields) {
               if (err) throw err
                  console.log("Number of records inserted: " + rows.affectedRows);
                  res.send('Added user'+user_id);
                  connection.end();
            });
   });
   
})

// This responds a GET request for the /list_user page.
app.get('/list_user',async function (req, res) {
   console.log("Got a request for /list_user");

   var result=[];
   const copy = []; 
   var json1 = null;
   var connection = mysql.createConnection(db_config);
   connection.connect(async function(err) {
      if (err) throw err;
         var selectionQuery="select * from user_profiles";
         console.log(selectionQuery);
         var response= await connection.query(selectionQuery, function (err, rowsList, fields) {
            if (err) throw err
            
            result = [...rowsList];
            connection.end();
            var string=JSON.stringify(result,null,2);
            var json =  JSON.parse(string);
            json1=JSON.parse(JSON.stringify(json));
            console.log(json1);
            res.header("Content-Type",'application/json');
            res.type('json').send(json);
            
         });
   });
   
   
  
})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("listening at http://%s:%s", host, port)
})