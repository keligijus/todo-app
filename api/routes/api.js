
// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Product = require('../models/task');

// Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/tasks');

// Return router
module.exports = router;
