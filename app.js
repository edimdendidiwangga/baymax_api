var express = require('express');
var session = require('express-session')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/baymax_api')

var index = require('./routes/index');
var users = require('./routes/users');
var diagnosis = require('./routes/diagnosis');
var disease = require('./routes/disease');

const app = express()
app.use(cookieParser('sssshhhh'));
app.use(session({
  cookieName: 'session',
  secret: 'sssshhhh',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true,
  resave: true,
  saveUninitialized: true
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/diagnosis', diagnosis);
app.use('/disease', disease);

app.use(passport.initialize());

passport.use(new Strategy(
  function(username, password, next) {
    let User = require('./models/user')
    User.findOne({ username: username }, function(err, user) {
      if (err) cb(err)
      if (passwordHash.verify(password, user.password)) {
        next(null, user)
      } else {
        next('Password is not correct ulang lagi bro')
      }
    })
  }
));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
