/*
 * Module dependencies.
 */
var orm = require('orm'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    _ = require('underscore');


/**
 * Validations
 */
    
var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * User Schema
 */
module.exports = function (db, callback) {
    db.load("./article", function (err) {
        if (err) return callback(err);
        var UserSchema = db.define("user", {
            name: String,
            email: String,
            username: String,
            provider: String,
            password: String
        },{ 
            validations: {
                name: orm.validators.notEmptyString('Name cannot be blank'),
                email: orm.validators.notEmptyString('Email cannot be blank'),
                username: [orm.validators.notEmptyString('Username cannot be blank'), orm.validators.unique("Username must be unique")],
                password: orm.validators.notEmptyString('Password cannot be blank')

            },

            autoFetch: true,

            hooks: {
                /**
                 * Pre-save hook
                 */
                beforeSave: function(next) {
                    if (!this.isNew) return next();

                    if (!validatePresenceOf(this.password))
                        next(new Error('Invalid password'));
                    else
                        next();
                },

                beforeCreate: function (next) {
                    this.password = this.encryptPassword(this.password);
                    next();
                }
            },
            
            /**
             * Methods
             */    
            methods: {
                /**
                 * Authenticate - check if the passwords are the same
                 *
                 * @param {String} plainText
                 * @return {Boolean}
                 * @api public
                 */
                authenticate: function(plainText) {
                    return bcrypt.compareSync(plainText, this.password);
                },

                /**
                 * Encrypt password
                 *
                 * @param {String} password
                 * @return {String}
                 * @api public
                 */
                encryptPassword: function(password) {
                    if (!password) return '';
                    return bcrypt.hashSync (password, bcrypt.genSaltSync(SALT_WORK_FACTOR));
                }
            }
        });
        return callback();
    });
};

/**
         * Virtuals
         */
        /*UserSchema.virtual('password').set(function(password) {
            this._password = password;
            this.hashed_password = this.encryptPassword(password);
        }).get(function() {
            return this._password;
        });*/

        