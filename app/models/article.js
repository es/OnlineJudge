/**
 * Module dependencies.
 */
var orm = require('orm');


/**
 * Article Schema
 */
 module.exports = function(db, callback) {
    var ArticleSchema = db.define('article', {
        created: Date,
        title: String,
        content: String
    }, {
        autoFetch: true,

        /**
         * Validations
         */
        validations: {
            title: orm.enforce.notEmptyString("Title can't be empty")
        }
    });
    return callback();
 };