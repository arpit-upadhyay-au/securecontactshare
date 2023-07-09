require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var utilsRouter = require('./routes/utils');
var userAccessRouter = require('./routes/userAccess');
var mongoose = require('mongoose');
var app = express();
var passport = require('passport');
var session = require('express-session');
const userAccess = require('./models/userAccess');

//Loading passport configuration
require('./config/passport')(passport);  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Connecting to MongoDB cluster
mongoose.connect(process.env.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => app.listen(3000))
	.catch(err => console.log(err));


// Express session
app.use(
  session({
    secret: process.env.sessionsecret,
    resave: true,
    saveUninitialized: true
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Loading Bootstrap dependencies
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/utils',isLoggedIn, utilsRouter);
app.use('/useraccess', isLoggedIn, userAccessRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//Checking if user has logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/user/login');
}

module.exports = app;
