var express = require('express');
var expressHandlebars = require('express3-handlebars');

var app = express();
var handlebars = expressHandlebars.create({defaultLayout: 'main'});

var data = require('./data');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/students', function(req, res){
  res.render('students', {
    students: data.students
  });
});

app.get('/weeks', function(req, res){
  res.render('weeks', {
    weekNumbers: [1,2,3,4,5,6,7]
  });
});

app.get('/weeks/:weekNumber', function(req, res){
  var weekNumber = req.params.weekNumber;
  res.render('week', {weekNumber: weekNumber});
})

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);
app.listen(port);