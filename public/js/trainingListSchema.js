const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// TODO: set trainingSchema.data to location of dataset with trainingSchema.name
const trainingSchema = new Schema({list: [{name: String, data: String}]});

const trainingSet = mongoose.model('Set', trainingSchema);

module.exports = trainingSet;