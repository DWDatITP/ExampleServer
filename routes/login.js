module.exports = {
  get: function(req, res){
    res.render('login');
  },
  post: function(req, res){
    var name = req.body.name;

    console.log('setting req.session.user=',name);
    req.session.user = name;

    res.redirect('/');
  }
};
