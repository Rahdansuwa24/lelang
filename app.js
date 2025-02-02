var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var flash = require('express-flash');
const MemoryStore = require('session-memory-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pemilikRouter = require('./routes/pemilik')
var mobilRouter = require('./routes/mobil')
var lelangRouter = require('./routes/lelang')
var tawarRouter = require('./routes/tawar')

const { strict } = require('assert');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash())
app.use(session({
  cookie: {
    maxAge: 6000000000000000,
    secure: false,
    httpOnly: true,
    sameSite: 'strict'
  },
  store: new MemoryStore(),
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/owner', pemilikRouter);
app.use('/cars', mobilRouter);
app.use('/loan', lelangRouter);
app.use('/tawar', tawarRouter);

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

module.exports = app;
