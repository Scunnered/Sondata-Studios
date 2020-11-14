const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/spectrograms";
const express = require('express');

const bodyParser = require('body-parser')
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
app.use(bodyParser.urlencoded({extended:true}))

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

    app.post('/add', function (req, res) {
        db.collection('spectrograms').save(req.body, function(err, result) {
            if (err) throw err;
            console.log('saved to database')
            res.redirect('/all')
        })
    })

    app.post('/image', function (req, res) {

        var json = getCanvas();        
        
        console.log('attempting')
        db.collection('spectrograms').insert(
            {test : 112, text : json}
        )
        console.log('attempt')
        res.redirect('/all')
    })

    app.post('/delete', function(req, res) {
        db.collection('spectrograms').deleteOne(req.body, function(err, result) {
            if (err) throw err;
            res.redirect('/all');
        });
    });
}

function getCanvas(){
    var CVS = document.getElementById("spectrogram");
    CVS.height = 10;
    CVS.width = 10;
    var CTX = CVS.getContext("2d");
    console.log(CVS)
    console.log(CTX)
    console.log(CVS.toDataURL())
    var canvasJson = JSON.parse(CVS.toDataURL());
    return canvasJson;
} 