const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://uk9232:Psyche1710@cluster0.ilt33tq.mongodb.net/test";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};