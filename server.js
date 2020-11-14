const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/spectrograms";
const express = require('express');

const bodyParser = require('body-parser')
const app = express();
const server = require('http').Server(app);

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.listen(8080);

var db;
var makeswork;

MongoClient.connect(url, function(err, database){
    if(err) throw err;
    db = database;
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

app.post('/delete', function(req, res) {
    db.collection('spectrograms').deleteOne(req.body, function(err, result) {
        if (err) throw err;
        res.redirect('/all');
    });
});

app.post('/image', function(req, res){
    console.log(JSON.parse(req.body))
    console.log('attempting')
    db.collection('spectrograms').insert(
        {test : 112, text : JSON.parse(req.body)}
    )
    console.log('attempt')
    res.redirect("/all")
});

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