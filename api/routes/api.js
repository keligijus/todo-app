
// Dependencies
var express = require('express');
var router = express.Router();
var _ = require('lodash');

// Serve static files
router.use(express.static('./app'));

// Models
var Task = require('../models/task');

// Routes
Task.methods(['get', 'put', 'post', 'delete']);

Task.after('get', function(req, res, next) {
  res.locals.bundle = _.reverse(res.locals.bundle)
  next();
});

Task.register(router, '/tasks');
// Return router
module.exports = router;
