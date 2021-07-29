const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const app = express();
const cors = require('cors')
require('express-async-errors')

const userboardRouter = require('./routes/userboardRouter');
const errorHandler = require('./middleware/errorHandler');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: "hello, stranger" })
});

/* GET home page. */
app.get('/api', function (req, res, next) {
  res.json({message: "hello api"});
});


app.use("/api/userboard", userboardRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = app;
