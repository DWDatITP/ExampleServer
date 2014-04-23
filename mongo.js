var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

var connected = false;
var db;

module.exports = {
  getDb: function(){
    if (!connected) {
      throw new Error('You must connect to mongo before you can call getDb');
    }
    return db;
  },
  getCollection: function(collectionName){
    if (!connected) {
      throw new Error('You must connect to mongo before youc an call getCollection');
    }

    return db.collection(collectionName);
  },
  connect: function(url, callback){
    MongoClient.connect(url, function(err, _db){
      if (err) {
        throw new Error('Failed to connect to mongo: '+err);
      }

      db = _db;
      connected = true;

      callback();
    });
  }
};
