var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){
    console.log("Login request")
    var username = req.body.username;
    var password = req.body.password;
    
        req.getConnection(function(err,conn){
            if (err) return next("Cannot Connect");
            

            
            var query = conn.query("INSERT INTO User (username, senha) VALUES(?, ?)", [username, password] ,function(err,rows){
                
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }

    
                //if user not found
                if(rows.length < 1) {
                    return res.send("User Not found");
                }

                return res.json({"status": "200", "user": username})
                // res.json(result)
            });
    
        });    

});

module.exports = router;