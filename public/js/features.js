const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const featureSchema  = new Schema({minValue: Number, maxValue: Number});

const Feature = mongoose.model('Feature', featureSchema);

module.exports = Feature;