var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}));
var mysql = require('mysql');
const PORT = process.env.PORT || 5000;

var client = mysql.createConnection({
    host: 'akelnicluster.cluster-c4nltsrd8r4d.us-west-2.rds.amazonaws.com',
    user: 'samy',
    password: '=f,N48~rwJqH',
    database: 'akelni_main'
});



client.connect();

app.get('/',function (req,res) {
    res.render('index.ejs',{msg:'no msg'})
    
})
app.post('/activate',function (req,res) {

    var value = req.body.value;
    var phone = req.body.phone;
    if(phone.length>5){
    client.query('UPDATE users set active=1 , wallet ='+value+' WHERE phone = '+phone, function (error, results, fields) {
        if (error) {
            res.render('index', { msg: error });
        } else {
            res.render('index', { msg: results });


        };

    }   );
    }else{
        res.send('phone<5')
    }
});


    
app.listen(PORT)