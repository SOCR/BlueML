const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// TODO: set trainingSchema.data to location of dataset with trainingSchema.name
const trainingSchema = new Schema({name: String, data: Object});

trainingSchema.statics.get = function(list) {
    trainingSchema.findOne({name: list}, function(err, result) {
        if (err) { throw err; }
        else {
            if (!result) return null;
            else return result;
        }
    });
}

trainingSchema.statics.add = function(name, data) {
    trainingSchema.create({
        name: name,
        data: data
    }).then(result =>{
        return result
    });
}

const trainingSet = mongoose.model('TrainingSet', trainingSchema);

module.exports = trainingSet;