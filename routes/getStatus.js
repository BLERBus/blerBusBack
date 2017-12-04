var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    console.log("getStatus request")
    req.getConnection(function(err,conn){
        
            if (err) return next("Cannot Connect");
            
            var query = conn.query('SELECT linha FROM StatusOnibus WHERE isDeleted = 0 GROUP BY linha',function(err,rows){
    
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }
                
                var linhas = []
                var result = JSON.parse(JSON.stringify(rows));
                for(var i = 0; i < result.length; i++){
                    linhas.push(result[i].linha)
                }
                
                let status = {}
                for(let i = 0; i < linhas.length; i++){
                        let query2 = conn.query('select linha, lotacao, count(*) Contagem from statusonibus where linha= ? and isDeleted = 0 group by lotacao, linha', [linhas[i]],function(err2,rows2){
                        var result2 = JSON.parse(JSON.stringify(rows2));
                        
                        let maior = ""
                        let Contagem = 0
                        for(let j=0; j < result2.length; j++){
                            if (Object.values(result2[j])[2] > Contagem){
                                Contagem = Object.values(result2[j])[2]
                                maior = Object.values(result2[j])[1]
                            }
                        }
                        
                        status[linhas[i]] = maior;
                        if(i === linhas.length - 1){
                            res.json(status)
                        }
                        
                    });
                    
                }
                
                
                }); 
        });
})

router.post('/', function(req, res, next) {
    req.getConnection(function(err,conn){
            let linhaSearch = req.body.linha
            console.log("linhaSearch request " + req.body.linha)
            if (err) return next("Cannot Connect");
            var query = conn.query('select linha, lotacao, count(*) Contagem from statusonibus where linha= ? and isDeleted = 0 group by lotacao, linha', [linhaSearch],function(err,rows){
                if(err){
                    console.log(err);
                    return next("Mysql error, check your query");
                }
                let result = JSON.parse(JSON.stringify(rows));
                let status= {}
                let maior = ""
                let Contagem = 0
                for(let i=0; i < result.length; i++){
                    if (Object.values(result[i])[2] > Contagem){
                        Contagem = Object.values(result[i])[2]
                        maior = Object.values(result[i])[1]
                    }
                }
                
                status[linhaSearch] = maior;
                console.log(status)
                res.json(status)
            })
    })
});
module.exports = router;