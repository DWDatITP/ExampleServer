var mongo = require('../mongo');

/*

// The student data is in Mongo, but it looks like this:

var studentData = [
  {id: 1, name: "Bing  Huang", username:'bing', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 2, name: "Brian  Clifton", username:'brian',attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 3, name: "Eunjin  Kim", username:'eunjin', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 4, name: "Jung Min  Hong", username:'jung', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 5, name: "Kyle E  Kleinbart", username:'kyle', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 6, name: "Kate (Margaret) Godwin", username: 'kate', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 7, name: "Neil  Solomon", username: 'neil', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 8, name: "Seiya  Kobayashi", username: 'seiya', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 9, name: "Tarana  Gupta", username: 'tarana', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 10, name: "Xinyi  Deng", username: 'xinyi', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']},
  {id: 11, name: "Zhuoying  Li", username: 'zhuoying', attendance: ['Y', 'Y', 'Y', 'N', 'N', 'N', 'N']}
];
*/

module.exports = {
  findById: function(id, callback){
    id = parseInt(id, 10); // make sure it is an integer

    var coll = mongo.getCollection('students');

    coll.findOne({id:id}, function(err, student){
      if (err) { throw new Error('Error finding student by id '+err); }

      callback(student);
    });
  },

  findByUsername: function(username, callback){
    var coll = mongo.getCollection('students');

    coll.findOne({username:username}, function(err, student){
      if (err) { throw new Error('Error finding student by username '+err); }

      callback(student);
    });
  },

  allStudents: function(callback){
    var coll = mongo.getCollection('students');
    coll.find({}).toArray(function(err, students){
      if (err) { throw new Error('Error finding allStudents '+err); }

      callback(students);
    });
  },

  // synchronous. Just reads data off the student. No callback.
  studentAttendanceForWeek: function(student, weekNumber){
    var weekNumberIndex = weekNumber - 1; // arrays start at 0, not 1

    return student.attendance[weekNumberIndex];
  },

  markAttendance: function(student, weekNumber, callback){
    var weekNumberIndex = weekNumber - 1; // arrays start at 0, not 1
    student.attendance[weekNumberIndex] = 'Y';

    var coll = mongo.getCollection('students');

    coll.update({id:student.id}, student, {upsert:true}, function(err, count){
      if (err) { throw new Error('Error updating student'+err);}

      callback(count);
    }); 
  }
};
