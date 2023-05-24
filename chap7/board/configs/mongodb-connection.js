const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://kywu9232:<password>@cluster0.sofpfol.mongodb.net/test";

module.exports = function (callback) {
    return MongoClient.connect(uri, callback);
};