var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){

    let id = req.body.id;
    console.log(id)

    console.log("reposta request")
    req.getConnection(function(err,conn){
        
            if (err) return next("Cannot Connect");
    
            var query = conn.query('SELECT * FROM Respostas where perguntaId = ?', id , function(err,rows){
    
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                let result = JSON.parse(JSON.stringify(rows)); 
                if (result.length > 0){
                    res.json(result); 
                }
                else{
                    res.json({"result": "No Data"}); 
                }
                });
        });
})

module.exports = router;
