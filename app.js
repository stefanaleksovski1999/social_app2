const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const postRoute = require('./routes/postRoute');
const userRoute = require('./routes/userRoute');
const commentsRoute = require('./routes/commentRoute')
const importRoute = require('./routes/importRoute');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
mongoose.connect('mongodb://localhost:27017/social-app');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/comments', commentsRoute);
app.use('/import', importRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
