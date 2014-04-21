var weeksData = require('../data/weeks');
var studentData = require('../data/students');

module.exports = {
  get: function(req, res){
    res.render('weeks', { weeks: weeksData });
  },

  weekNumber: function(req, res){
    var weekNumber = req.params.weekNumber;
    res.render('week', {
      weekNumber: weekNumber,
      students: studentData.allStudents(),
      helpers: {
        attendanceForWeek: function(student, weekNumber){
          return studentData.studentAttendanceForWeek(student, weekNumber);
        }
      }
    });
  },

  attendance: function(req, res){
    var weekNumber = req.params.weekNumber;
    weekNumber = parseInt(weekNumber, 10); // change from string to integer

    var student = studentData.findById( req.session.user_id );
    studentData.markAttendance(student, weekNumber);

    res.redirect('/weeks/'+weekNumber);
  }
};
