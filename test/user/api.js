/**
 * Module dependencies.
 */
var should = require('should'),
    app = require('../../server'),
    request = require('supertest')(app),
    config = require('../../config/config')/*,
    database = require('../../app/setupDatabase')*/;

//Globals
var user1, user2;

//The tests
describe('Users API', function() {
    
    before(function(done) {
        user1 = {
            name: 'Jane Doe',
            email: 'jane@doe.com',
            username: 'user1',
            password: 'password'
        };

        user2 = {
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'user2',
            password: 'password'
        };
        done();
    });

    describe('POST /users:', function() {    
        it('should create a new mock user', function(done) {
            request
                .post('/users')
                .send(user1)
                .set('Accept', 'application/json')
                .expect(302)
                .end(function(err, res){
                  if (err) return done(err);
                  done();
                });
        });

        it('should create a second mock user', function(done) {
            request
                .post('/users')
                .send(user2)
                .set('Accept', 'application/json')
                .expect(302)
                .end(function(err, res){
                  if (err) return done(err);
                  done();
                });
        });
    });

    describe('GET /users:', function() {    
        before(function (done) {
            user1.password = null;
            user2.password = null;
            done();
        });

        it('should return first mock user created', function(done) {
            // id 3 & 4 even though it should be 0 & 1; opened issue with node-orm2
            request
                .get('/users/3')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                  if (err) return done(err);
                  done();
                });
        });

        it('should return second mock user created', function(done) {
            request
                .get('/users/4')
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                  if (err) return done(err);
                  done();
                });
        });
        
        it('should return 404 for non-existant numeric id\'s', function(done) {
            request
                .get('/users/1337')
                .set('Accept', 'application/json')
                .expect(404)
                .end(function(err, res){
                  if (err) return done(err);
                  done();
                });
        });

        it('should return 400 for non-integer id\'s', function(done) {
            request
                .get('/users/iLovePie')
                .set('Accept', 'application/json')
                .expect(400)
                .end(function(err, res){
                  should.not.exist(err);
                });

            request
                .get('/users/3.14')
                .set('Accept', 'application/json')
                .expect(400)
                .end(function(err, res){
                  should.not.exist(err);
                });    
                done();
        });
    });
});