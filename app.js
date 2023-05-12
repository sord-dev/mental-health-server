const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const createError = require('http-errors')

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json())

app.use('/', require('./routes/api.route.js'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});



module.exports = app;