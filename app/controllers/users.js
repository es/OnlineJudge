/**
 * Module dependencies.
 */
var _ = require('underscore');
    _.str = require('underscore.string');


/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res) {
    req.body.provider = 'local';
    req.models.user.create(req.body, function (error, user) {
        if (error) throw error;
        user.save(function(err) {
            if (err) { //using jade signup page is depreciated so need to fix this
                return res.render('users/signup', {
                    errors: err.errors,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    });
};

/**
 *  Show profile
 */
exports.show = function(req, res) {
    if ( isNaN(req.params.showUserWithID) || _.str.include(req.params.showUserWithID, '.') ) res.send(400);
    req.models.user.get(req.params.showUserWithID, function (err, user) {
        if (err) res.send(404);
        else {
            user.password = null;
            res.send(user);
        }
    });
};


/*var cleanUsers = function (users) {
    for (var i = users.length - 1; i >= 0; i--) {
        delete users[i].password;
    }
}*/

/**
 *  Returns all users
 */
/*exports.all = function(req, res) {
    req.models.user.find({}, function (err, users) {
        if (err) res.send(400);
        cleanUsers(users, function(cleanUsers) {
            res.send(cleanUsers);
        });
    });
};*/

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    // Do we need to sanitize id here or will node-orm2 handle that for us?
    req.models.user.get(id, function (err, user) {
        if (err) res.send(400);
        req.profile = user;
        next();
    });
};