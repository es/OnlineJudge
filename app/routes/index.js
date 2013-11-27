module.exports = function(app, passport, auth) {
    require('./users')(app, passport, auth);
    require('./articles')(app, passport, auth);

    //Home route
    var index = require('../controllers/index');
    app.get('/', index.render);

};
