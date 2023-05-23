const { MongoClient } = require("mongodb");

const uri = "mongodb+srv:// /test";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};