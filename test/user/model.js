/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    config = require('../../config/config'),
    database = require('../../app/setupDatabase');
    /*mongoose = require('mongoose'),
    User = mongoose.model('User');*/

//Globals
var user, User;
var db;

//The tests
describe('<Unit Test>', function() {
    
    before(function (done) {
        database.setup(config.db, function (err, dbPassed) {
            db = dbPassed;
            User = db.models.user;
            done();
        });
    });

    describe('Model User:', function() {
        before(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });
            user2 = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            done();
        });

        describe('Method Save', function() {
            it('should begin with no users', function(done) {
                User.find({}, function(err, users) {
                    users.should.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function(done) {
                user.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it('should fail to save an existing user again', function(done) {
                user.save(function(err) {
                    should.not.exist(err);
                });
                return user2.save(function(err) {
                    should.exist(err);
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                user.name = '';
                return user.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });

        after(function(done) {
            User.find({}).remove(function (err) {
                if (err) throw err;
                done();
            });
        });
    });
});