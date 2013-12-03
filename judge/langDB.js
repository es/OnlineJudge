/*
 * Languages DB stores the details for languages that solutions can be written in
 */

var langDB = {};

langDB ['java'] = {
	name: 'JAVA',
	compiles: true,
	compileCmd: function (fileName) {
		return 'javac ' + fileName + '.java';
	},
	runCmd: function (fileName) {
		return 'java ' + fileName;
	},
	timeout: 1,
	dockerID: 'judge/java7',
	extension: 'java'
};

module.exports = langDB;