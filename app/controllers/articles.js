/**
 * Module dependencies.
 */
var _ = require('underscore');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    req.models.article.get(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    //Totally doesn't work D:
    req.models.article.create(req.body, function (error, article) {
        article.addDoctors(req.user, function (err) {
            article.save(function () {
                if (err || error) {
                    return res.send('users/signup', {
                        errors: err ? err.errors : error.errors,
                        article: article
                    });
                } else {
                    res.jsonp(article);
                }
            });
        });
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        res.jsonp(article);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    req.models.article.find({}, 'created', function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(articles);
        }
    });
};
