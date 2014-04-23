var mongo = require('../mongo');

/*

// The week data is in Mongo, but it looks like this:

var weekData = [
  {number: 1, date: new Date(2014, 2, 26)},
  {number: 2, date: new Date(2014, 3, 2)},
  {number: 3, date: new Date(2014, 3, 9)},
  {number: 4, date: new Date(2014, 3, 16)},
  {number: 5, date: new Date(2014, 3, 23)},
  {number: 6, date: new Date(2014, 3, 30)},
  {number: 7, date: new Date(2014, 4, 6)}
];
*/

module.exports = {
  allWeeks: function(callback){
    var coll = mongo.getCollection('weeks');

    coll.find({}).toArray(function(err, weeks){
      if (err) { throw new Error('Error getting allWeeks'+err);}
      callback(weeks);
    })
  },

  findByNumber: function(number, callback){
    var coll = mongo.getCollection('weeks');

    coll.findOne({number:number}, function(err, week){
      if (err) { throw new Error('Error getting week'+err);}
      callback(week);
    })
  },

  currentWeek: function(callback){
    var coll = mongo.getCollection('weeks');

    coll.findOne({date: {$lte: new Date()}}, {sort: [ ['date', -1] ]}, function(err, week){
      if (err) { throw new Error('Error getting currentWeek:'+err);}

      callback(week);
    });
  }
};
