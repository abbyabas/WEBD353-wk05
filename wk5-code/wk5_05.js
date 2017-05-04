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
    //const db = req.app.locals.db;
    req.app.locals.db.collection('dogs', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.render('index', {
                users: items
            });
        });
    });
});
// ADD OUR GET.("/") - HOMEPAGE CODE ABOVE -- END


// ADD GET.("/addDog") - VIEW CODE BELOW -- START
app.get('/addDog', function (req, res) {
    res.render('add', {
        title: "Add A Dog"
    });
});
// ADD GET.("/addDog") - VIEW CODE ABOVE -- START


// ADD POST.("/") - CODE BELOW -- START
app.post('/', function (req, res) {
    req.body.id = randomID(10);
    req.body.img = "/images/doggo.gif";
    const db = req.app.locals.db;
    db.collection('dogs', function (err, collection) {
        collection.insert(req.body, function (err, result) {
            console.log('Inserted %d documents into the "dogs" collection:', result.length, result);
        });
        collection.find().toArray(function (err, items) {
            res.render('index', {
                users: items
                , success: "Your Dog Was Added to the List"
            });
        });
    });
});
// ADD POST.("/") - CODE ABOVE -- START


// ADD OUR GET.("/:id") - VIEW CODE BELOW -- START
app.get('/:id', function (req, res) {
    const db = req.app.locals.db;
    db.collection('dogs', function (err, collection) {
        collection.find({
            id: req.params.id
        }).toArray(function (err, item) {
            console.log(item);
            res.render('view', {
                users: item
            });
        });
    });
});
// ADD GET.("/:id") - VIEW CODE ABOVE -- END





// ADD OUR DELETE("/:id") - CODE BELOW -- START
app.delete('/:id', function (req, res) {
    const db = req.app.locals.db;
    db.collection('dogs', function (err, collection) {
        collection.deleteOne({ //delete the dog
            id: req.params.id //
        }, function (err, result) {
            console.log('Deleted the record.');
        });
        collection.find().toArray(function (err, items) { //getting all the dogs that you have to display now
            res.render('index', { //go to the home page after deleting the dog
                users: items,
                deleted: "Your Dog Was Deleted From the List"
            });
        });
    });
});


// ADD OUR DELETE("/:id") - CODE ABOVE -- START




//Start our server
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
