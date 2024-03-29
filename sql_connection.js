
var mysql = require('mysql')

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('db.properties');

var host_value = properties.get('host');
var user_value = properties.get('user');
var password_value = properties.get('password');
var database_value = properties.get('database');

var db_config= {
   host: host_value,
   user: user_value,
   password: password_value,
   database: database_value
 };


module.exports = {
 get_con: function(){
    return mysql.createConnection(db_config);
 },

   doesExist: function(table,field,value){
      return new Promise((resolve,reject)=>{
         var connection = mysql.createConnection(db_config); 
         var selectionQuery="select * from "+table+" where "+field+"='"+value+"'";
         //console.log(selectionQuery);
         
         connection.connect(function(err) {
            if (err) throw err;
               connection.query(selectionQuery, function (err, rowsList, fields) {
                  connection.end();
                  console.log("rowslist count"+rowsList.length);
                  resolve(rowsList.length);
               });
         });
      })
   }
}