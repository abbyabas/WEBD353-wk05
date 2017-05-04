var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/dog_list'; //our database is called dog_list - this is where you name the database
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        //Insert Code Here
        console.log('Connection established to', url);
        // Data is stored in collections; we need to create one
        var collection = db.collection('dogs'); //this is where you name the collection
        //Create some users
        var user1 = { //this is all the sample_data - all the documents within the collection
            "id": "2"
            , "name": "Milo"
            , "breed": "Lab/Sharpei"
            , "age": "7"
            , "owner": "Rob"
            , "img": "/images/milo.jpg"
        };
        var user2 = {
            "id": "3"
            , "name": "Isis"
            , "breed": "Alaskan Malamute"
            , "age": "1"
            , "owner": "Pam Anderson"
            , "img": "/images/isis.jpg"
        };
        var user3 = {
            "id": "4"
            , "name": "Billie"
            , "breed": "Pitbull"
            , "age": "3"
            , "owner": "Annie Jones"
            , "img": "/images/billie.jpg"
        };
        // Insert some users
        collection.insert([user1, user2, user3], function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
            //Close connection
            db.close();
        });
    }
});
