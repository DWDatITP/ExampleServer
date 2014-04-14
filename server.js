var express = require('express');
var expressHandlebars = require('express3-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();

var handlebars = require('./helpers/create_handlebars');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({secret:'somesecretword'}));

var checkLogin = require('./middleware/check_login');

app.use(checkLogin);

app.get('/', function(req, res){
  res.render('index');
});

app.get('/students', function(req, res){
  var studentData = require('./data/students');
  res.render('students', {
    students: studentData
  });
});

app.get('/weeks', function(req, res){
  var weeksData = require('./data/weeks');

  res.render('weeks', {
    weeks: weeksData
  });
});

app.get('/weeks/:weekNumber', function(req, res){
  var weekNumber = req.params.weekNumber;
  res.render('week', {weekNumber: weekNumber});
});

var formRoutes = require('./routes/form');
app.get('/form', formRoutes.get);
app.post('/form', formRoutes.post);

var loginRoutes = require('./routes/login');
app.get('/login', loginRoutes.get);
app.post('/login', loginRoutes.post);

var logoutRoutes = require('./routes/logout');
app.get('/logout', logoutRoutes.get);

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);
app.listen(port);
