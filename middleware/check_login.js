module.exports = function(req, res, next){
  if (req.session.user) {
    res.locals.currentUser = req.session.user;
  }

  next();
};
