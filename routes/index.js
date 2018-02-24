//import util file
var utils = require('../utils');
var express = require('express');
var router = express.Router();
const http = require("http");

var urls = ["http://dashboard.savemysales.co/devtest/1", "http://dashboard.savemysales.co/devtest/2"];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'SaveMySales' });

});

router.get('/calculate', function(req, res, next) {
  var responses = [];
  var completed_requests = 0;

  for (i in urls) {
    http.get(urls[i], function(resp) {
      let result = '';

      resp.on('data', (chunk) => {
        result += chunk;
      });

      resp.on('end', () => {
        const parsed = JSON.parse(result);
        for (k in parsed) responses.push(parsed[k])

        completed_requests++;

        if (completed_requests == urls.length) {
          // Process responses array now.
          const reducer = (acc, cur) => acc + cur;
          // console.log(responses.reduce(reducer));
          const sum = responses.reduce(reducer);
          const factors = primeFactorList(sum);
          res.status(200).json({success: true, value: sum, numbers: responses, factors: factors});
        }
      });
    });
  }

});

/*
 * Returns the list of prime factors (in ascending order) of the given integer.
*/
function primeFactorList(n) {
	if (n < 1) throw "Argument error";
	var result = [];
	while (n != 1) {
		var factor = smallestFactor(n);
		result.push(factor);
		n /= factor;
	}
	return result;
}

/*
 * Returns the smallest prime factor of the given integer.
 */
function smallestFactor(n) {
	if (n < 2)
		throw "Argument error";
	if (n % 2 == 0)
		return 2;
	var end = Math.floor(Math.sqrt(n));
	for (var i = 3; i <= end; i += 2) {
		if (n % i == 0)
      return i;
	}
	return n;
}

module.exports = router;
