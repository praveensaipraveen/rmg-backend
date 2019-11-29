var sql_conn = require('./sql_connection');


module.exports = {

list_user: function(req,res){
   var json1 = null;
   var connection = sql_conn.get_con();
   connection.connect(async function(err) {
      if (err) throw err;
         var selectionQuery="select * from user_profiles";
         console.log(selectionQuery);
         var response= await connection.query(selectionQuery, function (err, rowsList, fields) {
            if (err) throw err
            console.log("rowlist listuser count:"+rowsList.length);
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
},

check: function(){
    var user_id="varun_ravula";
    return new Promise((resolve, reject)=>{
        if(user_id === "varun_ravula"){
            console.log("resolved");
            resolve(user_id);
        }else{
            console.log("rejected");
            reject("rejected");
        }
    });
},

add_user1: function(req,res){
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
        // console.log("key:"+i);
        // console.log("value:"+req.body[i]);
    }

    this.check().then(

        // (val)=>{
        //     console.log("user_id value:"+val);
        //     res.send(val);
        // }
        function(result){
            console.log(result)
            res.send('{"JSON":'+result+'}');
        },
        function(error){
            console.log(error)
            //res.send(error)
            res.send('{"JSON":"NA"}')
        }
    );
},

add_user: function(req,res){
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
///////////////////////////////////////////////////////////////////
        sql_conn.doesExist("user_profiles","user_id",user_id).then((cnt) =>{
            
        if( cnt > 0 ){
            console.log("user_id not available for new user");
            res.send('{"User_ID":"Not Available"}');
        }else{
            console.log("user_id available for new user");
            var connection = sql_conn.get_con();
            connection.connect(function(err) {
            if (err){
                console.log("error:"+err)    
                throw err;
            } 
            
                    var insertionQuery="insert into user_profiles(user_id,phone,email_id,f_name,l_name,state)  values('"+user_id+"','"+phone+"','"+email_id+"','"+f_name+"','"+l_name+"','"+state+"')";
                    //console.log(insertionQuery);
                    connection.query(insertionQuery, function (err, rows, fields) {
                        if (err){ 
                            console.log("error:"+err)
                            throw err
                        }
                        
                        console.log("Number of records inserted: " + rows.affectedRows);
                        res.send('Added user'+user_id);
                        connection.end();
                    });
            });
        }
    }).catch(err=>{
        console.log("error:"+err)
    })

//////////////////////////////////////
        
    }, //add user ends



    update_user: function(req,res){
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

        if(user_id==""){
            console.log("user id not available to update user record");
            res.send("User id is necessary");
            res.end();
            return;
        }
///////////////////////////////////////////////////////////////////
        sql_conn.doesExist("user_profiles","user_id",user_id).then((cnt) =>{
                if( cnt > 0 ){
                    var connection = sql_conn.get_con();
                        connection.connect(function(err) {
                                if (err){
                                    console.log("error:"+err)    
                                    throw err;
                                } 
                                var updationQuery="update  user_profiles set phone= '"+phone+"',email_id='"+email_id+"',f_name='"+f_name+"',l_name='"+l_name+"',state='"+state+"'";
                                connection.query(updationQuery, function (err, rows) {
                                    if (err) throw err;
                                            console.log(rows.affectedRows + " record(s) updated");
                                });                                    
                                    
                                    res.send('updated user'+user_id);
                                    res.end();
                                    connection.end();
                        });            
                }else{
                    console.log("user_id not in record for updation");
                res.send("Not valid user");
                res.end();
                }
    }).catch(err=>{
        console.log("error:"+err)
        res.send("Error")
        res.end()
    })
//////////////////////////////////////
    } //update user ends
};