var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  req.getConnection(function(err,conn){
        if (err) return next("Cannot Connect");

        var query = conn.query('SELECT id, horario FROM StatusOnibus',function(err,rows){

            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            var result = JSON.parse(JSON.stringify(rows)); 
            // console.log(JSON.parse(JSON.stringify(rows)));
            // console.log(result)

            
            var data = {}
            for(var i=0; i < result.length; i++){
                data[result[i].id] = result[i].horario
            }
            // data = JSON.parse(data)
            // console.log(Object.values(data)[])
            // console.log(Object.values(data)[0])
            var currentTime = new Date ();
            for (var i = 0; i < Object.keys(data).length; i++){
                var horario = new Date(Object.values(data)[i])
                var diferenca = new Date(currentTime.getTime() - horario.getTime())

                if(diferenca.getUTCHours() > 2){
                    var query = conn.query('UPDATE StatusOnibus SET isDeleted = 1 WHERE id = ?', [Object.keys(data)[i]], function(err,rows){
                        if(err){console.log(err)}
                    })
                }
                else{
                    var query = conn.query('UPDATE StatusOnibus SET isDeleted = 0 WHERE id = ?', [Object.keys(data)[i]], function(err,rows){
                        if(err){console.log(err)}
                    })
                }
            }
            });
    });
});

module.exports = router;
