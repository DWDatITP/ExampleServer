var studentData = require('../data/students');

module.exports = function(req, res, next){
  if (req.session.user_id) {
    res.locals.currentUser = studentData.findById(req.session.user_id);
  }

  next();
};
