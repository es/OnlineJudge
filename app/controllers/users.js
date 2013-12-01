/**
 * Module dependencies.
 */

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
            if (err) {
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
    var user = req.profile;

    res.render('users/show', {
        title: user.name,
        user: user
    });
};

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
    req.models.user
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};