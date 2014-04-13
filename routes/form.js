module.exports = {
  get: function(req, res){
    res.render('form');
  },

  post: function(req, res){
    var formResults = {};
    formResults.name          = req.body.name;
    formResults.favoriteColor = req.body.favoriteColor;
    formResults.tos           = req.body.tos;
    formResults.upOrDown      = req.body.upOrDown;

    res.render('form', {formResults: formResults});
  }
};
