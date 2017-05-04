var express = require('express');
var app = express();
var path = require('path');
var fs = require("fs");
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var randomID = require("random-id");
var methodOverride = require('method-override');

// ADD MONGODB PACKAGES CODE BELOW -- START
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/dog_list';
// ADD MONGODB PACKAGES CODE ABOVE -- END

app.use(methodOverride('_method'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data

// ADD THE MONGODB CONNECTION CODE BELOW -- START
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        console.log('Connection established to', url);
        app.locals.db = db;
    }
});
// ADD THE MONGODB CONNECTION CODE ABOVE -- END

// ADD OUR GET.("/") - HOMEPAGE CODE BELOW -- START
app.get('/', function (req, res) {
    const db = req.app.locals.db;
    db.collection('dogs', function (err, collection) { //search the dogs collection
        collection.find().toArray(function (err, items) { //grabing every single record - toArray will convert it to an array
            res.render('index', { //gonna render the index
                users: items
            });
        });
    });
});
// ADD OUR GET.("/") - HOMEPAGE CODE ABOVE -- END


//Start our server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
