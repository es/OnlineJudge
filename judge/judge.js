var shell = ('shelljs'),
	db = require('orm'),
	Teams = db.model('Team'),
	Langs = db.model('Lang'),
	Problems = db.model('Problem'),
	fs = require('fs');



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


//sudo docker run -n=false -w=/usr/judge -i -t -v=/vagrant/judge/test/:/usr/judge/:rw test/java7 java Test

var buildCompileCmd = function (dockerID, compileCmd, codeExtension) {
	return "sudo docker run -n=false -w=/usr/judge -i -t -v=/vagrant/judge/test/:/usr/judge/:rw " + dockerID + " " + compileCmd + " Test." + codeExtension;
}

var buildRunCmd = function (dockerID, runCmd, codeExtension) {
	return "sudo docker run -n=false -w=/usr/judge -i -t -v=/vagrant/judge/test/:/usr/judge/:rw " + dockerID + " timout " + timeToRun + "s " + runCmd + " Test." + codeExtension;
}

/*
Arguements: 
	teamID - id to identify team
	prob - problem name
	code - potential solution for problem uploaded by team
	lang - language in which the potential solution is coded
	callback - callback to call when finished testing code
*/
module.exports.test = function (team, prob, code, lang, next) {
		async.waterfall([
		    function(callback){
		        teamExists(team, callback);
		    },
		    function(err, callback){
		        if (err) throw err;
		        probExists(prob, callback);
		    },
		    function(err, callback){
		        if (err) throw err;
		        langSupported(lang, );
		    }
		], function (err, result) {
			if (err) throw err;
			else
				testCode(team, prob, code, lang, next);
		});
	}
};

