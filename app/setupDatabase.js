/*
 * bootstrap database
 */

var async = require('async'),
    orm = require('orm');

module.exports.setup = function (config, next) {
    async.waterfall([
        function (callback) {
            orm.connect(config, function (err, db) {
               if (err) throw err;
                callback(null, db);
            });
        },
        function (db, callback) {
            //Load models
            db.load("./models/models.js", function (err) {
                if (err) throw err;
                callback(null, db);
            });
        }, 
        function (db, callback) {
            var models = db.models;
            //models.user.hasMany("articles", models.article, {reverse: "authors"});
            models.article.hasMany("authors", models.user, {company: String}, {reverse: "articles"});
            callback(null, db);
        },
        function (db, callback) {
            // Create db tables
            db.sync(function (err) {
                //if (err) throw err;
                callback(null, db);
            });
        }], function (err, db) {
            next(null, db);
        }
    );
};