var studentData = require('../data/students');

module.exports = function(req, res, next){
  if (req.session.user_id) {
    studentData.findById(req.session.user_id, function(student){
    	res.locals.currentUser = student;
    	next();
    });
  } else {
  	next();
  }
};
