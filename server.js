var express = require('express');
var expressHandlebars = require('express3-handlebars');

var app = express();
var handlebars = expressHandlebars.create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('index', {luckyNumber: Math.round( Math.random() * 10 )})
});

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);
app.listen(port);