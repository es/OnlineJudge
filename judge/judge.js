var shell = require('shelljs'),
	async = require('async'),
	langDB = require('./langDB'),
	exec = require('child_process').exec,
	fs = require('fs');

var TEST_FOLDER = '/vagrant/judge/test/';

//Example of what run command should produce
//sudo docker run -n=false -w=/usr/judge -t -v=/vagrant/judge/test/:/usr/judge/:rw test/java7 timout 1s java Test

/*
 * Returns string to build file for lang
 * Arguments:
 * dockerID - id of the docker container that runs this lang 
 * compileCmd - command to compile  
 * codeExtension - extension of lang 
 */
var buildCompileCmd = function (lang) {
	return "sudo docker run -n=false -w=/usr/judge -t -v=/vagrant/judge/test/:/usr/judge/:rw " + lang.dockerID + " " + lang.compileCmd('Test');
};

/*
 * Arguments:
 * dockerID - id of the docker container that runs this lang 
 * compileCmd - command to compile  
 * codeExtension - extension of lang 
 */
var buildRunCmd = function (lang) {
	return "sudo docker run -n=false -w=/usr/judge -t -v=/vagrant/judge/test/:/usr/judge/:rw " + lang.dockerID + " timeout " + lang.timeout + "s " + lang.runCmd('Test');
};

/*
Arguements: 
	prob - problem object
	solution - path to solution for problem uploaded by team
	lang - language in which the potential solution is coded
	callback - callback to call when finished testing code
*/
module.exports.test = function (prob, solution, lang, callback) {
	lang = langDB[lang];
	async.waterfall([function (next) {
		// Adds solution to test folder
		fs.readFile(solution, function (err, fileStream) {
			var path = TEST_FOLDER + 'Test.' + lang.extension;
			fs.writeFile(path, fileStream, next);
		});
	},
	function (next) {
		// Adds test case file to test folder
		fs.readFile(prob.testCase.path, function (err, fileStream) {
			var path = TEST_FOLDER + prob.testCase.fileName;
			fs.writeFile(path, fileStream, next);
		});
	},
	function (next) {
		// Run build commands
		shell.cd(TEST_FOLDER);
		if (lang.compiles) {
			shell.exec(buildCompileCmd(lang), function(code, output) {
				next(null);
			});
		}
		else
			next (null);
		
	},
	function (next) {
		// Run execution commands
		shell.exec(buildRunCmd(lang), function(code, output) {
			next(null);
		});

	},
	function (next) {
		// Checks if output exists/created
		// Checks if output is the same as expected solution
		try {
			var realSolution = fs.readFileSync(prob.solution).toString();
			var output = fs.readFileSync(TEST_FOLDER + 'data.out').toString();
			if (realSolution === output)
				next(null, 'GOOD_ANSWER', true);
			else 
				next(null, 'BAD_ANSWER', false);
		}
		catch (exception) {
			next(null, 'OUTPUT_FILE_ISSUE', false);
		}
	},
	function (issue, result, next) {
		// Cleans test folder
		fs.readdir(TEST_FOLDER, function (err, files) {
			async.each(files, fs.unlink, function (error) {
				if (error) throw error;
				next(null, issue, result);
			});
		});
	}], function (err, issue, isSolutionCorrect) {
		// Returns whether or not solution was the same as the predetermined solution
		if (err) throw err;
		var resultObj = {
			result: isSolutionCorrect,
			reason: issue
		};
		callback(resultObj);
	});
};
