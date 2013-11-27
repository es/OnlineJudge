module.exports = function (db, callback) {
	db.load("./language", function (err) {
		if (err) throw err;
		return callback();
	});
};