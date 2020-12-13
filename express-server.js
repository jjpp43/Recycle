const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;

//Load everything that's beneath public folder as static files
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + 'index/html'));
});

app.listen(port, function() {
    console.log('Server running on port 3000');
});