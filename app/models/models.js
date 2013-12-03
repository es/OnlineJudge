module.exports = function (db, callback) {
	db.load("./problem", function (err) {
		if (err) throw err;
		return callback();
	});
};