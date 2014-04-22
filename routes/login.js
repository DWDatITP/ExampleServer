var studentData = require('../data/students');

module.exports = {
  get: function(req, res){
    res.render('login');
  },

  post: function(req, res){
    var username = req.body.username;

    var student = studentData.findByUsername(username);

    if (student) {
      req.session.user_id = student.id;
    }

    res.redirect('/');
  }
};
