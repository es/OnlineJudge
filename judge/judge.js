var shell = ('shelljs'),
	db = require('mongoose'),
	Teams = db.model('Team'),
	Lang = db.model('Lang'),
	fs = require('fs');



/*var langSupported = function(lang) {
	Judge.findOne({'name': lang}, function (err, person) {

	});
};*/

var testCode = function (prob, code, lang, callback) {
	Lang.find({"name": lang}, function (err, language) {
		shell.mv(code.location, __dirname + "/test" + code.name);
		shell.cd(__dirname + "/test");
		if (lang.compiles())
			shell.exec(lang.compileCmd);
		shell.exec(lang.run);
	});
}


/*sudo docker run -n=false -w=/usr/judge -i -t -v=/vagrant/judge/test/:/usr/judge/:rw test/java7 java Test

var buildCompileCmd = function (dockerID, compileCmd, codeExtension) {
	return "sudo docker run -n=false -w=/usr/judge -i -t -v=/vagrant/judge/test/:/usr/judge/:rw " + dockerID + " " + compileCmd + " Test." + codeExtension;
}

var buildRunCmd = function (dockerID, runCmd, codeExtension) {
	return "sudo docker run -n=false -w=/usr/judge -i -t -v=/vagrant/judge/test/:/usr/judge/:rw " + dockerID + " " + runCmd + " Test." + codeExtension;
}*/

/*
Arguements: 
	teamID - id to identify team
	prob - problem name
	code - potential solution for problem uploaded by team
	lang - language in which the potential solution is coded
	callback - callback to call when finished testing code
*/
module.exports.test = function (team, prob, code, lang, callback) {
	if (!teamExists(team))
		new Error ("Invalid team ID");
	else if (!probExists(prob)) 
		new Error("Invalid problem ID");
	else if (langSupported(lang)) 
		new Error("Invalid language");
	else {
		testCode();
	}
};

