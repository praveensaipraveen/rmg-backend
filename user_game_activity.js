var sql_conn = require('./sql_connection');


module.exports = {
    // called after user enters and submits the phone number in the game app 
    allowUser: function(req,res){
        console.log(req.body);
        var game_id="";
        var phone = "";
        var device_id = "";
        var game_auth_code = "";
        

        for(var i in req.body){
            switch(i){
                    case "game_id":
                        game_id=req.body[i];
                        break;
                    case "phone":
                        phone=req.body[i];
                        break;
                    case "device_id":
                        device_id=req.body[i];
                        break;
                    case "game_auth_code":
                        game_auth_code=req.body[i];
                        break;
            }
            console.log("key:"+i);
            console.log("value:"+req.body[i]);
        }
        console.log("before verified call exist function");
    ///////////////////////////////////////////////////////////////////
        
        sql_conn.isGameIdValid(game_id,game_auth_code).then((valid)=>{
            
            if(!valid){
                res.send('{"Error":"GameID invalid"}');
            }else{
                
                    sql_conn.verfiedUserExist("user_profiles","phone",phone).then((cnt) =>{
                        
                                if( cnt > 0 ){
                                    console.log("verified user exists");
                                    var connection = sql_conn.get_con();
                                    connection.connect(async function(err) {
                                        if (err) throw err;
                                            var json1 = null;
                                            
                                            
                                            var date= new Date().toISOString().slice(0, 19);
                                            //date=new Date(d.getFullYear+"-"+d.getMonth+"-"+d.getDate+"T"+d.getHours+":"+d.getMinutes+":"+d.getSeconds);
                                            console.log("date:"+date);
                                            var selectionQuery="select * from tournaments where end_time >'"+date+"' and game_id = "+game_id;
                                            console.log(selectionQuery);
                                            var response= await connection.query(selectionQuery, function (err, rowsList, fields) {
                                                if (err) throw err
                                                console.log("rowlist tournaments count:"+rowsList.length);
                                                result = [...rowsList];
                                                connection.end();
                                                var string=JSON.stringify(result,null,2);
                                                var json =  JSON.parse(string);
                                                json1=JSON.parse(JSON.stringify(json));
                                                
                                                console.log(json1);
                                                //res.header("Content-Type",'application/json');
                                                res.type('json').send(json);
                                            });
                                    });
                                }else{
                                    // hit OTP sms url here
                                    res.send('{"Access":"OTP"}'); //{ALLOWED,OTP,NA} here, OTP pane is allowed
                                }
                    }).catch(err=>{
                        console.log("error:"+err)
                        res.send('{"Access":"NA"}'); //error; try again message
                    })
                    
            }
        })
    //////////////////////////////////////
    },

    otpCheck: function(req,res){

    },

    isTournamentValid: async function(req,res){
        console.log(req.body);
        var game_id="";
        var phone = "";
        var tournament_id = "";
        var game_auth_code = "";
        
        for(var i in req.body){
            switch(i){
                    case "game_id":
                        game_id=req.body[i];
                        break;
                        case "phone":
                        phone=req.body[i];
                        break;
                    case "tournament_id":
                        tournament_id=req.body[i];
                        break;
                    case "game_auth_code":
                        game_auth_code=req.body[i];
                        break;
            }
            console.log("key:"+i);
            console.log("value:"+req.body[i]);
        }
    ////////////////////////////////////////////////
        var date= new Date().toISOString().slice(0, 19);
        var selectionQuery="select * from tournaments where end_time >'"+date+"' and occupied_slots < available_slots ";
                                            var connection = sql_conn.get_con();
                                            console.log(selectionQuery);
                                            var response= await connection.query(selectionQuery, function (err, rowsList, fields) {
                                                if (err) throw err
                                                console.log("rowlist tournaments count:"+rowsList.length);
                                                connection.end();
                                                if(rowsList.length > 0)
                                                    res.type('json').send('{"valid":"true"}');
                                                else
                                                    res.type('json').send('{"valid":"false"}');
                                            });
    
    },

    // phone, tournament_id,start_time are added first 
    // later, when submitting score, end_time of the tournament round, score and corresponding rank at that point of time are updated in the row of the table
    //no. of  rounds are calculated based on the unique start_time entries for each (tournament_id, phone) combination 
    enterTournamentGame: function(req,res){
        console.log(req.body);
        var game_id="";
        var phone = "";
        var tournament_id = "";
        var game_auth_code = "";
        var device_id = "";
        
        for(var i in req.body){
            switch(i){
                    case "game_id":
                        game_id=req.body[i];
                        break;
                        case "phone":
                        phone=req.body[i];
                        break;
                    case "tournament_id":
                        tournament_id=req.body[i];
                        break;
                    case "game_auth_code":
                        game_auth_code=req.body[i];
                        break;
                    case "device_id":
                        device_id=req.body[i];
                        break;
            }
            console.log("key:"+i);
            console.log("value:"+req.body[i]);
        }
        ////////////////////////////////////////////////        
            var connection = sql_conn.get_con();
            connection.connect(function(err) {
            if (err){
                console.log("error:"+err)    
                throw err;
            } 
                    var date = new Date();
                    var startTime = date.toISOString().slice(0, 19);
                    var insertionQuery="insert into tournament_data(tournament_id,phone,start_time)  values('"+tournament_id+"','"+phone+"','"+startTime+"')";
                    connection.query(insertionQuery, function (err, rows, fields) {
                        if (err){ 
                            console.log("error:"+err)
                            throw err
                        }
                        connection.end();
                            // result = [...rows];
                            // var string=JSON.stringify(result,null,2);
                            // var json =  JSON.parse(string);
                            // json1=JSON.parse(JSON.stringify(json));
                            // console.log(json1);
                            // res.header("Content-Type",'application/json');
                            // res.type('json').send(json);
                        console.log("Number of records inserted: " + rows.insertId);
                        var msg="Added tournament round for :"+phone+" started at time:"+date.toString();
                        res.send('{"success":'+msg+',"id":'+rows.insertId+'}');
                    });
            });

    },


    //step 1:enter score, tournament_id, phone, end_time created in this function
    // step 2: calculate Top 10 ranks and send in JSON along with his rank
    submitScore: function(req,res){
        console.log(req.body);
        var game_id="";
        var phone = "";
        var tournament_id = "";
        var game_auth_code = "";
        var device_id = "";
        var score = "";
        var ref_id = "";

        for(var i in req.body){
            switch(i){
                    case "game_id":
                        game_id=req.body[i];
                        break;
                        case "phone":
                        phone=req.body[i];
                        break;
                    case "tournament_id":
                        tournament_id=req.body[i];
                        break;
                    case "game_auth_code":
                        game_auth_code=req.body[i];
                        break;
                    case "device_id":
                        device_id=req.body[i];
                        break;
                    case "score":
                        score=req.body[i];
                        break;
                    case "ref_id":
                        ref_id=req.body[i];
                        break;
            }
            console.log("key:"+i);
            console.log("value:"+req.body[i]);
        }
        ////////////////////////////////////////////////        
        var connection = sql_conn.get_con();
            connection.connect(function(err) {
            if (err){
                console.log("error:"+err)    
                throw err;
            } 
                    var date = new Date();
                    var endTime = date.toISOString().slice(0, 19);
                    var updationQuery="update tournament_data set score = '"+score+"',end_time='"+endTime+"' where id='"+ref_id+"'";
                    
                    connection.query(updationQuery, async function (err, rows, fields) {
                        if (err){ 
                            console.log("error:"+err)
                            throw err
                        }
                        console.log("Number of records updated: " + rows.affectedRows);
                        //select FIND_IN_SET((select max(score) from tournament_data where phone='1010101010' and tournament_id=9),GROUP_CONCAT( distinct t.score  order by  t.score desc)) as rank from (select max(score) as score,phone from  tournament_data group by  phone, tournament_id desc)  t;
                        var rankQuery="select FIND_IN_SET((select max(score) from tournament_data where phone='"+phone+"' and tournament_id="+tournament_id+"),GROUP_CONCAT( distinct t.score  order by  t.score desc)) as rank from (select max(score) as score,phone from  tournament_data group by  phone, tournament_id desc)  t";
                        await connection.query(rankQuery, async function (err, rows, fields) {
                                if (err){ 
                                    console.log("error:"+err)
                                    throw err
                                }
                            
                            if(rows.length>0){
                            
                                var result = [...rows];
                                var string=JSON.stringify(result,null,2);
                                var json =  JSON.parse(string);
                                var rank=json[0].rank;
                                console.log("rank:"+rank); 
                                var rankListQuery = "select phone,score,FIND_IN_SET(score,(select GROUP_CONCAT( distinct score  order by  score desc) from tournament_data)) as rank,tournament_id from (select max(score) as score,phone,tournament_id from  tournament_data group by phone, tournament_id ) as t where tournament_id="+tournament_id+"  order by rank asc limit 10";
                                await connection.query(rankListQuery, function (err, rows, fields) {
                                    if (err){ 
                                        console.log("error:"+err)
                                        throw err
                                    }
                                    connection.end();
                                    var result = [...rows];
                                    result.push({"rank":rank})
                                    var string=JSON.stringify(result,null,2);
                                    var json =  JSON.parse(string);
                                    json1=JSON.parse(JSON.stringify(json));
                                    console.log(json1);
                                    res.header("Content-Type",'application/json');
                                    res.type('json').send(json);
                                });
                            }else{
                                //not expected to execute
                            }
                            // json1=JSON.parse(JSON.stringify(json));
                            // console.log(json1);
                            // res.header("Content-Type",'application/json');
                            // res.type('json').send('{"rank":'+rank+'}');
                        });
                    });// updationquery end
            }); //connect end
    }


}