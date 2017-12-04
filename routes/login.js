var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:

  req.getConnection(function(err,conn){
    
        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT * FROM User',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            console.log(req.body)
            var result = JSON.parse(JSON.stringify(rows)); 
            // console.log(JSON.parse(JSON.stringify(rows)));
            res.json(result);

            });
    });
});

router.post('/', function(req, res, next){
    console.log("Login request")
    var username = req.body.username;
    var password = req.body.password;
    
        req.getConnection(function(err,conn){
            if (err) return next("Cannot Connect");
            

            
            var query = conn.query("SELECT * FROM User WHERE username = ? ", [username] ,function(err,rows){
                
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }

    
                //if user not found
                if(rows.length < 1) {
                    return res.send("User Not found");
                }

                var result = JSON.parse(JSON.stringify(rows));
                console.log(result[0].senha)
                for(var i = 0; i < result.length; i++){
                    if(result[i].senha === password){
                        return res.json({"status": "200", "user": result[i].username})
                    }
                }
                return res.json({"status": "500", "Auth": "Usuário ou senha não conferem."})
                // res.json(result)
            });
    
        });    

});

module.exports = router;