/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    async = require('async'),
    orm = require('orm'),
    passport = require('passport');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

//Load configurations
//if test env, load example file
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config/config'),
    auth = require('./config/middlewares/authorization'),
    database = require('./app/setupDatabase');

var app = express();

//Bootstrap db connection & models
database.setup(config.db, function (err, db) {
    if (err) throw err;
        
    //Add models to request object
    app.use(function (req, res, next) {
        req.models = db.models;
        next();
    });

        //bootstrap passport config
    require('./config/passport')(passport, db.models.user);

    //Start logger
    app.configure('production', function(){
      app.use(express.logger());
    });

    //express settings
    require('./config/express')(app, passport, db);

    //Bootstrap routes
    require('./app/routes')(app, passport, auth);

    //Start the app by listening on <port>
    var port = process.env.PORT || config.port;
    app.listen(port);
    console.log('Express app started on port ' + port);
});


//expose app
exports = module.exports = app;
