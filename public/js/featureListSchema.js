const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Assuming one feature is defined by its range of values
const featureSchema  = new Schema({name: String, minValue: Number, maxValue: Number});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;