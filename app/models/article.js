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
            title: orm.validators.notEmptyString("Title cannot be blank")
        }
    });
    return callback();
 };