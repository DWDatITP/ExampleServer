var weeksData = require('../data/weeks');
var studentData = require('../data/students');
var moment = require('moment');

module.exports = {
  get: function(req, res){
    weeksData.allWeeks(function(weeks){
      res.render('weeks', {weeks: weeks});
    });
  },

  weekNumber: function(req, res){
    var weekNumber = req.params.weekNumber;
    weekNumber = parseInt(weekNumber, 10);
    weeksData.findByNumber(weekNumber, function(week){
      studentData.allStudents(function(allStudents){
        res.render('week', {
          week: week,
          students: allStudents,
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
      })
    });
  },

  attendance: function(req, res){
    var weekNumber = req.params.weekNumber;
    weekNumber = parseInt(weekNumber, 10); // change from string to integer

    var student = studentData.findById( req.session.user_id, function(student){
      studentData.markAttendance(student, weekNumber, function(){
        res.redirect('/weeks/'+weekNumber);
      });
    });
  }
};
