const createError = require('http-errors');
const express = require('express');
const mysql = require('mysql2');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
// const fs = require('fs-extra');
const cookieParser = require('cookie-parser');

// ログ格納場所
const logDirectory = path.join(__dirname, './logs');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const sampleRouter = require('./routes/sample');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const listRouter = require('./routes/lists');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ディレクトリ存在確認
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
logger.accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), { flags: 'a'});

app.use(logger('combined', { stream: logger.accessLogStream}));


// セッション管理
app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);


// ログイン情報確認
app.use((req, res, next) => {
  console.log(req.session);
  if (req.session.userId === undefined) {
    console.log('ログインしていません');
    res.locals.userName = 'ゲスト';
    res.locals.isLoggedIn = false;
  } else {
    console.log('ログインしています');
    res.locals.userName = req.session.userName;
    res.locals.isLoggedIn = true;
  }
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sample', sampleRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/lists', listRouter);

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
