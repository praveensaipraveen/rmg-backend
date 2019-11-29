var sql_conn = require('./sql_connection');


module.exports = {
    addTournament: function(req,res){
        console.log(req.body);
        var game_id="";
        var tournament_name = "";
        var occupied_slots = 0;
        var available_slots = 0;
        var start_time = "";
        var end_time = "";
        var entry_fee = 0;
        var prize1 = 0;
        var prize1_quota_pc = 0;
        var prize2 = 0;
        var prize2_quota_pc = 0;
        var prize3 = 0;
        var prize3_quota_pc = 0;        

        for(var i in req.body){
            switch(i){
                    case "game_id":
                        game_id=req.body[i];
                        break;
                    case "tournament_name":
                        tournament_name=req.body[i];
                        break;
                    case "occupied_slots":
                        occupied_slots=req.body[i];
                        break;
                    case "available_slots":
                        available_slots=req.body[i];
                        break;
                    case "start_time":
                        start_time=req.body[i];
                        break;
                    case "end_time":
                        end_time=req.body[i];
                        break;
                    case "entry_fee":
                        entry_fee=req.body[i];
                        break;
                    case "prize1":
                        prize1=req.body[i];
                        break;
                    case "prize1_quota_pc":
                        prize1_quota_pc=req.body[i];
                        break;
                    case "prize2":
                        prize2=req.body[i];
                        break;
                    case "prize2_quota_pc":
                        prize2_quota_pc=req.body[i];
                        break;
                    case "prize3":
                        prize3=req.body[i];
                        break;
                    case "prize3_quota_pc":
                        prize3_quota_pc=req.body[i];
                        break;
            }
            console.log("key:"+i);
            console.log("value:"+req.body[i]);
        }
        
        ///////////////////////////////////////////////////////////////////
        var dateEnd= new Date(end_time);
        var dateStart = new Date(start_time);

            if(dateEnd<=dateStart)
                res.send('{"error":"Invalid Endtime: EndTime must be greater than StartTime"}');
            else{

                var connection = sql_conn.get_con();
                connection.connect(function(err) {
                    if (err){
                        console.log("error:"+err)    
                        throw err;
                    } 
                    var insertionQuery="insert into tournaments (game_id,tournament_name,occupied_slots,available_slots,start_time,end_time,entry_fee,prize1,prize1_quota_pc,prize2,prize2_quota_pc,prize3,prize3_quota_pc)\
                    values('"+game_id+"','"+tournament_name+"','"+occupied_slots+"','"+available_slots+"','"+start_time+"','"+end_time+"','"+entry_fee+"','"+prize1+"','"+prize1_quota_pc+"','"+prize2+"','"+prize2_quota_pc+"','"+prize3+"','"+prize3_quota_pc+"')";
                    //console.log(insertionQuery);
                    connection.query(insertionQuery, function (err, rows, fields) {
                        if (err){ 
                            console.log("error:"+err)
                            res.send('{"error":"'+err+'"}');
                            connection.end();
                            throw err
                        }
                        
                        console.log("Number of records inserted: " + rows.affectedRows);
                        res.send('Added tournament:'+tournament_name);
                        connection.end();
                    });
                });
            }
    },

    listGames: function(req,res){
        var json1 = null;
        var connection = sql_conn.get_con();
        connection.connect(async function(err) {
           if (err) throw err;
              var selectionQuery="select * from game_list";
              console.log(selectionQuery);
              var response= await connection.query(selectionQuery, function (err, rowsList, fields) {
                 if (err) throw err
                 console.log("rowlist game_list count:"+rowsList.length);
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

    }

}