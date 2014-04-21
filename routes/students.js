var studentData = require('../data/students');

module.exports = {
  get: function(req, res){
    res.render('students', {
      students: studentData.allStudents()
    });
  }
};
