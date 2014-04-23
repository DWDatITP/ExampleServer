var express = require('express');
var expressHandlebars = require('express3-handlebars');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var mongo = require('./mongo');
var mongoUrl = 'mongodb://dwdweek5:dwdweek5@ds053448.mongolab.com:53448/dwd-week5';

var app = express();

var handlebars = require('./helpers/create_handlebars');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({secret:'somesecretword',
  store: new MongoStore({
    url: mongoUrl
  })
}));

var checkLogin = require('./middleware/check_login');
var requireLogin = require('./middleware/require_login');

app.use(checkLogin);

var weekData = require('./data/weeks');
app.get('/', function(req, res){
  weekData.currentWeek( function(currentWeek){
    res.render('index', {
      currentWeek: currentWeek
    })
  });
});

var studentRoutes = require('./routes/students');
app.get('/students', studentRoutes.get);

var weeksRoutes = require('./routes/weeks');
app.get('/weeks', weeksRoutes.get);

app.get('/weeks/:weekNumber', weeksRoutes.weekNumber);
app.post('/attendance/:weekNumber', requireLogin, weeksRoutes.attendance);

var loginRoutes = require('./routes/login');
app.get('/login', loginRoutes.get);
app.post('/login', loginRoutes.post);

var logoutRoutes = require('./routes/logout');
app.get('/logout', logoutRoutes.get);

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
console.log('Listening on port',port);

app.get('/insert', function(req, res){
  var name = req.query.name;
  var coll = mongo.getCollection('test');

  var data = {floor: 4, class: 'DWD', name:name};
  coll.insert(data, function(err, something){

    res.json(something);
  });
});

app.get('/lookup', function(req, res){
  var name = req.query.name;
  var coll = mongo.getCollection('test');

  coll.find({name:name}).toArray(function(err, docs){
    console.log('err',err);
    console.log('docs',docs);
    res.json(docs);
  });
});

mongo.connect(mongoUrl, function(){
  console.log('mongo is connected');
  app.listen(port);
});
