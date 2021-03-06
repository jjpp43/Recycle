const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const xss = require('xss');

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

app.use(bodyParser.json());//JSON 타입의 데이터를 받기위한 설정
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views');         //랜더링할 파일이 있는 디렉토리 
//Load everything that's beneath public folder as static files
//디자인 파일이 위치할 정적 요소들을 저장하는 디렉토리
app.use(express.static(__dirname + '/public')); 

//data disclosure 방지
app.get('/', function(req, res) {
    res.render('index')
});

//Send client's name, client's phone number, and client's address to the database
app.post('/', function(req, res) {
    const xssOptions = {
        whiteList: [],
        stripIgnoreTag: true,
        stripIgnoreTagBody: [
          "script"
        ]
      },
      myXSSObjects = Object.fromEntries([
          "clientName",
          "clientNumber",
          "clientAddress"
        ].map((property) => [
          property,
          xss(req.body[property], xssOptions)
        ]));
    
    const clientName = myXSSObjects.clientName;
    const clientNumber = myXSSObjects.clientNumber;
    const clientAddress = myXSSObjects.clientAddress;
    console.log(clientName);
    console.log(clientNumber);
    console.log(clientAddress);

    const sqlQuery = `INSERT INTO client.client(client_name, client_number, client_address) VALUES($1,$2,$3)`;
    const data = ['{'+clientName+'}', '{'+clientNumber+'}', '{'+clientAddress+'}'];
    //Always avoid string concatination inside the query text directly
    client.query(sqlQuery, data)
        .then(result => console.log(result))
        .catch(e => console.error(e.stack))
        .then(() => {
            res.status(200).json("1");
            client.end();
            console.log("Connection ended");
        });
});


app.listen(port, function() {
    console.log("Server running");
});