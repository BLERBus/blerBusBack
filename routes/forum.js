var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log("forum request")
    req.getConnection(function(err,conn){
        
            if (err) return next("Cannot Connect");
    
            var query = conn.query('SELECT id, pergunta FROM Forum LIMIT 10', function(err,rows){
    
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                var result = JSON.parse(JSON.stringify(rows)); 
                //console.log(result.rows)
                res.json(result);
    
                });
        });
})

router.post('/', function(req, res, next){
    console.log("forum post request")
    req.getConnection(function(err,conn){

            var pergunta = req.body.pergunta;
        
            if (err) return next("Cannot Connect");
    
            var query = conn.query('INSERT INTO Forum (pergunta) values(?) ',pergunta, function(err,rows){
    
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                //console.log(result.rows)
                res.json({"status": "200"});
    
                });
        });
})

module.exports = router;