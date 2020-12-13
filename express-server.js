const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

//---------------------Connect database----------------------------
// const pg = require('pg');
// const connectionString = 'postgres://kfpjhyajqmrrxk:d401bfa9a09ff3dd0c1726a9cb1f6051e23a1e547b01b959b4bc47cafb8f575f@ec2-3-220-98-137.compute-1.amazonaws.com:5432/d7p7dd6akmlvm6';

// const client = new pg.Client(connectionString);
// client.connect();

// client.connect();
//---------------------Connect database----------------------------
//Load everything that's beneath public folder as static files
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'index/html'));
});

app.listen(port, function() {
    console.log('Server running on port 3000');
});