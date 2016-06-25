
// Dependencies
var express = require('express');
var router = express.Router();
var _ = require('lodash');

// Models
var Product = require('../models/task');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);

Product.after('get', function(req, res, next) {
  res.locals.bundle = _.reverse(res.locals.bundle)
  next();
});

Product.register(router, '/tasks');
// Return router
module.exports = router;
