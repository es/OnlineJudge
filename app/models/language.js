
var _ = require('underscore');

/*
	Schema for different languages that solutions can be submitted in
*/
module.exports = function (db, callback) {
	db.load("./user", function (err) {
		if (err) return callback(err);
		var LanguageSchema = db.define("lang", {
			name: String,
			compiles: Boolean,
			compilesCommand: String,
			runCommand: String,
			timeout: Number
		});

		return callback();
	});
};