
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('underscore');

/*
	Schema for different languages that solutions can be submitted in
*/

var LanguageSchema = new Schema({
	name: String,
	compiles: Boolean,
	compilesCommand: String,
	runCommand: String,
	timeout: Number
});

mongoose.model('Lang', LanguageSchema);