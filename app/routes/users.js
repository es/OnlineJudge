//User Routes

var users = require('../controllers/users'),
    async = require('async');

module.exports = function (app, passport, auth) {
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    /*
     * Should probably move processing into controller
     */
    app.post('/users/session', function(req, res, next) {        
        passport.authenticate('local', function(err, user, info) {
            if (err) return next(err);
            
            if (!user) return res.send(401, info);
            
            req.logIn(user, function(err) {
                if (err) return next(err);
                user.password = null;
                return res.send(200, user);
            });
        })(req, res, next);
    });

    app.get('/users/:showUserWithID', users.show);
    /*app.get('/users', users.all);*/
    /*app.get('/users/me', users.me);*/

    //Finish with setting up the userId param
    app.param('userId', users.user);
};