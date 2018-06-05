const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Assuming one feature is defined by its range of values
const featureListSchema  = new Schema({list: [{name: String, minValue: Number, maxValue: Number}]});

const FeatureList = mongoose.model('Feature', featureListSchema);

module.exports = FeatureList;