const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const featureListStructureSchema  = new Schema({features : {}});

const FeatureLS = mongoose.model('Feature', featureListStructureSchema);

module.exports = FeatureLS;