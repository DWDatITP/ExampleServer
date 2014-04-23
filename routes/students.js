var studentData = require('../data/students');

module.exports = {
  get: function(req, res){
  	studentData.allStudents(function(students){
	    res.render('students', {
	      students: students
	    });
  	});
  }
};
