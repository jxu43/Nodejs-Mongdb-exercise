const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, db) => {
    assert.equal(err,null);
    console.log('Connected correctly to server');

    const collection = db.collection("dishes");

    //插入一个doc
    collection.insertOne({
        "name": "Uthappizza",
        "description": "test"
    }, (err, result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        //读取当前插入的doc
        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);

            console.log("Found:\n");
            console.log(docs);

            //断开与服务器的连接
            db.dropCollection("dishes", (err, result) => {
               assert.equal(err, null);
               db.close();
            });
        });
    });
});