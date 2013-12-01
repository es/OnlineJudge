var LocalStrategy = require('passport-local').Strategy,
    config = require('./config');


module.exports = function(passport, User) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.get(id, function(err, user) {
            done(err, user);
        });
    });

    //Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.find({
                email: email
            }, function(err, user) {
                user = user[0];
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: "email"
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'password'
                    });
                }
                return done(null, user);
            });
        }
    ));
};