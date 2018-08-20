const mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Assuming one feature is defined by its range of values
//const featureListSchema  = new Schema({list: [{name: String, minValue: Number, maxValue: Number}]});
const featureListSchema  = new Schema({name: String, data: Object});

function get(name) {
    featureListSchema.findOne({name: name}, function(err, result) {
        if (err) { throw err; }
        else {
            if (!result) return null;
            else return result;
        }
    });
}

function add(name, data) {
    featureListSchema.create({
        name: name,
        data: data
    }).then(result =>{
        return result
    });
}


const FeatureList = mongoose.model('Feature', featureListSchema);

module.exports = FeatureList;