const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

//---------------------Connect to database----------------------------
const { Client } = require('pg');
const client = new Client({ 
    connectionString: 'postgres://kfpjhyajqmrrxk:d401bfa9a09ff3dd0c1726a9cb1f6051e23a1e547b01b959b4bc47cafb8f575f@ec2-3-220-98-137.compute-1.amazonaws.com:5432/d7p7dd6akmlvm6',
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();
//---------------------Connect to database----------------------------

//Load everything that's beneath public folder as static files
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); 

app.get('/', function(req, res) {
    res.render(path.join(__dirname + 'index'))
});

app.post('/', function(req, res) {
    console.log(req.body);
    var name = req.body.clientName ;
    var number = req.body.clientNumber;
    var address = req.body.clientAddress;
    // client.query('INSERT INTO ', (err, res) => {

    // });
});


app.listen(port, function() {
    console.log('Server running on port 3000');
});