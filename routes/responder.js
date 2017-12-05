var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next){

    let resposta = req.body.resposta;
    let perguntaId = req.body.perguntaId;
    let autor = req.body.autor;

    console.log(resposta)
    console.log(perguntaId)
    console.log(autor)

    console.log("responder request")
    req.getConnection(function(err,conn){
        
            if (err) return next("Cannot Connect");
    
            var query = conn.query('INSERT INTO respostas (resposta, perguntaId, autor) values(?, ?, ?)', [resposta, perguntaId, autor] , function(err,rows){
    
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }
                   
                res.json({"status": "200"}); 
                });
        });
})

module.exports = router;
