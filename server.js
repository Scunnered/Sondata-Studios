const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const server = require('http').Server(app);

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.listen(8080);

var db;

var mongo = true;

if (mongo) {
    const MongoClient = require('mongodb').MongoClient;
    const url = "mongodb://localhost:27017/spectrograms";
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
        console.log(req.body)
        console.log('attempting')
        db.collection('spectrograms').insert(
            {test : 113, text : req.body}
        )
        console.log('attempt')
        res.redirect("/all")
    });

    app.post('/remove', function(req, res){
        console.log(req.body)
        console.log('attempting')
        db.collection('spectrograms').remove(
            {test : 113, text : req.body}
        )
        console.log('attempt')
        res.redirect("/all")
    });
}