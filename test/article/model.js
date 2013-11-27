/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    config = require('../../config/config'),
    database = require('../../app/setupDatabase');
    // mongoose = require('mongoose'),
    // User = mongoose.model('User'),
    // Article = mongoose.model('Article');

//Globals
var user, User;
var article, Article;
var db;

//The tests
describe('<Unit Test>', function() {
    
    before(function (done) {
        database.setup(config.db, function (err, dbPassed) {
            db = dbPassed;
            User = db.models.user;
            Article = db.models.article;
            done();
        });
    });

    describe('Model Article:', function() {
        beforeEach(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            user.save(function(err) {
                article = new Article({
                    title: 'Article Title',
                    content: 'Article Content'
                }).setAuthors(user).save(function (err) {
                    if (err) throw err;
                    done();
                });
            });
        });

        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return article.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });

            it.skip('should be able to show an error when try to save without title', function(done) {
                return article.save({title: ""}, function(err) {    
                    should.exist(err);
                    done();
                });
            });
        });

        afterEach(function(done) {
            Article.find({}).remove(function (err) {
                if (err) throw err;
                User.find({}).remove(function (error) {
                    if (error) throw error;
                    done(); 
                }); 
            });
        });
        after(function(done){
            Article.find({}).remove(function (err) {
                if (err) throw err;
                User.find({}).remove(function (error) {
                    if (error) throw error;
                    done(); 
                }); 
            });
        });
    });
});
