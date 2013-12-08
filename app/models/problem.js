
var _ = require('underscore');

/*
	Schema for different languages that solutions can be submitted in
*/
module.exports = function (db, callback) {
	db.load("./user", function (err) {
		if (err) return callback(err);
		var Problem = db.define("problem", {
			name: String,
			author: String,
			pdf: String,
			problemStatement: String,
			testCase: Object,
			solution: String
		});

		Problem.create([
			{
				name: 'Pratice Problem',
				author: "Fluttershy",
				pdf: '/vagrant/judge/problems/PracticeProblem/PracticeProblem.pdf',
				problemStatement: "Output the numbers in the input file.",
				testCase: {
					path: '/vagrant/judge/problems/PracticeProblem/data.in',
					fileName: 'data.in'
				},
				solution: '/vagrant/judge/problems/PracticeProblem/data.out'
			}
		], function (err, items) {
			return callback();
		});
	});
};