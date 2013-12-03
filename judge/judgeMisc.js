/*var langSupported = function(lang) {
	Judge.findOne({'name': lang}, function (err, person) {

	});
};*/

var probExists = function (probID, next) {
	Problems.load(probID, function (err, problem) {
		if (err) 
			throw err;
		else if (problem.length != 0)
			next(new Error("Invalid problem ID"));
		else
			next(null, true);
	});
}

var testCode = function (prob, code, lang, callback) {
	Lang.find({"name": lang}, function (err, language) {
		shell.mv(code.location, __dirname + "/test" + code.name);
		shell.cd(__dirname + "/test");
		if (lang.compiles())
			shell.exec(lang.compileCmd);
		shell.exec(lang.run);
	});
}