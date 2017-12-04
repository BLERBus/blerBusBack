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
    console.log("getUsers post request")
    console.log(req.body);
    res.json([{id: 1, username: "teste"}]);
});

module.exports = router;