const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/spectrograms";
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended:true}))

var db;
var makeswork;

MongoClient.connect(url, function(err, database){
    if(err) throw err;
    db = database;
    app.listen(8080);
});

app.get('/', function(req, res){
    res.send("Hello world! by express");
});

app.get('/all', function(req, res) {
    db.collection('spectrograms').find().toArray(function(err, result) {
        if (err) throw err;
        
        var output = "<h1>All the data</h1>";
        
        for (var i = 0; i < result.length; i++) {
            output += "<div>"
            output += "<h3>" + result[i].test + "</h3>"
            output += "<p>" + result[i].text + "</p>"
            output += "</div>"
        }
        res.send(output);
    });
});

app.post('/quotes', function (req, res) {
    db.collection('spectrograms').save(req.body, function(err, result) {
        if (err) throw err;
        console.log('saved to database')
        res.redirect('/')
    })
})

app.listen(8080);