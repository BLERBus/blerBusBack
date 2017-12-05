var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log("getLinhas request")
    req.getConnection(function(err,conn){
        
            if (err) return next("Cannot Connect");
    
            var query = conn.query('SELECT Denominacao_Provisoria FROM linhasOnibus',function(err,rows){
    
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                var result = JSON.parse(JSON.stringify(rows)); 
                // console.log(JSON.parse(JSON.stringify(rows)));
                
                res.json({result});
    
                }); 
        });
})

router.post('/', function(req, res, next){
    console.log("Post Get Linhas request")
    var data = {
        linha:req.body.linha,
        rua:req.body.rua,
        status:req.body.status,
        hour:req.body.hour
     };

     req.getConnection(function(err,conn){
        
            if (err) return next("Cannot Connect");
    
            var query = conn.query('INSERT INTO StatusOnibus (linha, ponto, horario, lotacao) values(?,?,?,?)', [data.linha, data.rua, data.hour, data.status] ,function(err,rows){
                
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }

                var result = {"status": 200}; 
                // console.log(JSON.parse(JSON.stringify(rows)));
                
                res.json({result});
    
                }); 
        });

})
module.exports = router;