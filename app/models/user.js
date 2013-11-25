/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    _ = require('underscore');


/**
 * User Schema
 */
var UserSchema = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        unique: true
    },
    provider: String,
    hashed_password: String
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function(password) {
    this._password = password;
    this.hashed_password = this.encryptPassword(password);
}).get(function() {
    return this._password;
});

/**
 * Validations
 */
var validatePresenceOf = function(value) {
    return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function(email) {
    return email.length;
}, 'Email cannot be blank');

UserSchema.path('username').validate(function(username) {
    return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function(hashed_password) {
    return hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.password))
        next(new Error('Invalid password'));
    else
        next();
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */
    authenticate: function(plainText) {
        return bcrypt.compareSync(plainText, this.hashed_password);
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
};

mongoose.model('User', UserSchema);