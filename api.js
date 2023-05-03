const cors = require("cors");
const express = require("express");
const morgan = require("morgan");


const api = express();

api.use(cors());
api.use(morgan('dev'));
api.use(express.json())

api.use('/', require('./routes/api.route.js'));

api.use((req, res, next) => {
    next(createError.NotFound());
  });
  
  api.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      status: err.status || 500,
      message: err.message,
    });
  });
  


module.exports = api;