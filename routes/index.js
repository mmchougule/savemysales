//import util file
var utils = require('../utils');
var express = require('express');
var router = express.Router();
const http = require("http");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'SaveMySales' });
});

router.get('/calculate', utils.calculateData);

module.exports = router;
