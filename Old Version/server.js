const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/spectrograms";
const express = require('express');

const app = express();
const server = require('http').Server(app);
var colormap = false;
var mongo = true;

if (colormap) {
    let colormap = require("colormap")

    const colors = colormap({
        colormap: 'rainbow-soft',
        nshades: 256,
        format: 'float'
    });
    const fs = require('fs');
    fs.writeFile('colourmaps/rainbow-soft.json', JSON.stringify(colors), function(err, data) {
        if(err) console.log('error', err);
    });  
}

app.use(express.static('public'))

server.listen(8080); //listens on host 8080

if (mongo) {

    var db;
    var makeswork;
    
    MongoClient.connect(url, function(err, database){
        if(err) throw err;
        db = database;
        app.listen(8080);
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
}
