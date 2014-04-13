var expressHandlebars = require('express3-handlebars');
var handlebars = expressHandlebars.create({
  defaultLayout: 'main',
  helpers: {
    formatDate: function(date){
      var moment = require('moment');

      // See: http://momentjs.com/docs/#/displaying/format/
      return moment(date).format('dddd, MMM Do, YYYY');
    }
  }
});

module.exports = handlebars;
