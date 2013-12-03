/**
 * Module dependencies.
 */
var should = require('should'),
    fs = require('fs'),
    app = require('../../../server'),
    config = require('../../../config/config'),
    database = require('../../../app/setupDatabase'),
    judge = require('../../../judge/judge'),
    langDB = require('../../../judge/langDB');

//Globals
var problem;
var TEST_FOLDER = '/vagrant/judge/test/';


var probObj = {
    name: '',
    author: '',
    pdf: 'path/to/pdf',
    problemStatement: 'LargeString',
    testCase: {
        path: 'path/to/test/case',
        fileName: 'fileNameOfTestCase.txt'
    },
    solution: 'path/to/solution'
};

var GOOD_OUTPUT_SOLUTION = __dirname + '/Correct.java';
var BAD_OUTPUT_SOLUTION = __dirname + '/Incorrect.java';
var BAD_TIMEOUT_SOLUTION = __dirname + '/Timeout.java';
var BAD_NO_FILE_MADE_SOLUTION = __dirname + '/NoFile.java';
var BAD_FILE_NAME_SOLUTION = __dirname + '/WrongFile.java';

//The tests
describe('Judge Tests', function() {
    
    before(function (done) {
        database.setup(config.db, function (err, db) {
            db.models.problem.find({name: 'Pratice Problem'}, function (err, result) {
                problem = result[0];
                done();
            });
        });
    });

    describe('Java submissions', function() {
        it('should be deemed as a correct solution', function(done) {
            judge.test(problem, GOOD_OUTPUT_SOLUTION, 'java', function (resultObj) {
                resultObj.result.should.be.equal(true);
                resultObj.reason.should.be.equal('GOOD_ANSWER');
                done();
            });
        });

        it('should be deemed as incorrect: bad answer', function(done) {
           judge.test(problem, BAD_OUTPUT_SOLUTION, 'java', function (resultObj) {
                resultObj.result.should.be.equal(false);
                resultObj.reason.should.be.equal('BAD_ANSWER');
                done();
            }); 
        });

        // Not proper
        it('should be deemed as incorrect: timeout', function(done) {
            judge.test(problem, BAD_TIMEOUT_SOLUTION, 'java', function (resultObj) {
                resultObj.result.should.be.equal(false);
                resultObj.reason.should.be.equal('OUTPUT_FILE_ISSUE');
                done();
            });
        });

        it('should be deemed as incorrect: can\'t find output file (no output file)', function(done) {
            judge.test(problem, BAD_NO_FILE_MADE_SOLUTION, 'java', function (resultObj) {
                resultObj.result.should.be.equal(false);
                resultObj.reason.should.be.equal('OUTPUT_FILE_ISSUE');
                done();
            });
        });

        it('should be deemed as incorrect: can\'t find output file (bad name)', function(done) {
            judge.test(problem, BAD_FILE_NAME_SOLUTION, 'java', function (resultObj) {
                resultObj.result.should.be.equal(false);
                resultObj.reason.should.be.equal('OUTPUT_FILE_ISSUE');
                done();
            });
        });

        it ('test folder should be empty', function (done) {
            fs.readdir(TEST_FOLDER, function (err, files) {
                files.should.have.length(0);
                done();
            });
        });
    });
});