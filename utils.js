const http = require("http");

function calculateData(req,res) {
  const responses = [];
  let completed_requests = 0;

  let urls = ["http://dashboard.savemysales.co/devtest/1", "http://dashboard.savemysales.co/devtest/2"];
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

          const sum = responses.reduce(reducer);
          const factors = primeFactorList(sum);
          res.status(200).json({success: true, value: sum, numbers: responses, factors: factors});
        }
      });
    });
  }

}

/*
 * Returns the list of prime factors (in ascending order) of the given integer.
*/
function primeFactorList(n) {
	if (n < 1) throw "Argument error";
	let result = [];
	while (n != 1) {
		let factor = smallestFactor(n);
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
	let end = Math.floor(Math.sqrt(n));
	for (let i = 3; i <= end; i += 2) {
		if (n % i == 0)
      return i;
	}
	return n;
}

module.exports.calculateData = calculateData;
