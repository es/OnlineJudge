/**
 * Module dependencies.
 */
var judge = require('../../judge/judge'),
	langDB = require('../../judge/langDB');


/*
Arguements: 
	prob - problem name
	solution - path to solution for problem uploaded by team
	lang - language in which the potential solution is coded
	callback - callback to call when finished testing code
*/

var isLangauge = function (lang) {
	return !!langDB [lang];
};

exports.submit = function(req, res, next) {
    // do all the sanitization 
	if ( isNaN(req.query.user) || isNaN(req.query.prob) || req.files [req.query.fileName] || isLangauge(req.query.lang) )
		res.send(400);
	req.models.user.get(req.query.user, function (err, user) {
		if (err) res.send(400);
		//do stuff to user (increment, decrement, ect)
		req.models.problem.get(re.query.prob, function (error, problem) {
			if (error) res.send(400);
			judge.test(problem, req.files [req.query.fileName].path, req.query.lang, function (resultObj) {
				//do stuff depending on success or failure of submission to user/team (in contest scenario)
				/*if (resultObj.result) {}
				else {}*/
				res.send(200, resultObj);
			});
		});
	});
};