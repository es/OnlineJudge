//Judge Routes
var judge = require('../controllers/judge');

module.exports = function (app, passport, auth) {
	app.post('/judge/:probID', auth.requiresLogin, judge.submit);

	// Manually route submissions depending on whether it is a contest or not 
	/*app.post('/judge/:probID', auth.requiresLogin, function (res, req, next) {
		if (req.query.contest)
		judge.submit
    });*/
};