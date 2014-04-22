var weeksData = require('../data/weeks');
var studentData = require('../data/students');
var moment = require('moment');

module.exports = {
  get: function(req, res){
    res.render('weeks', { weeks: weeksData.allWeeks() });
  },

  weekNumber: function(req, res){
    var weekNumber = req.params.weekNumber;
    weekNumber = parseInt(weekNumber, 10);
    var week = weeksData.findByNumber(weekNumber);
    res.render('week', {
      week: week,
      students: studentData.allStudents(),
      helpers: {
        attendanceForWeek: function(student, weekNumber){
          var attendance = studentData.studentAttendanceForWeek(student, weekNumber);
          if (attendance === 'Y') {
            return 'Present';
          } else {
            return 'Absent';
          }
        },
        formatDate: function(date){
          return moment(date).format('MMMM Do YYYY');
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
