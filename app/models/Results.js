// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resultsSchema new Schema({
	filename: String,
	disease: String,
	model: String,
	dataset: String,
	accuracy: String,
	symptoms: [String],
	treatments: [String],
});


module.exports = mongoose.model('Results', resultsSchema);
