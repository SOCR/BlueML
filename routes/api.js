var express = require('express');
var router = express.Router();
var FeatureList = require('../public/js/featureListSchema.js');
var TrainingSet = require('../public/js/trainingListSchema.js');

router.get('/request', function(req, res){
 	process.on('uncaughtException', function (err) {
	  res.send("ERROR: Invalid Request")
	  console.log(err);
	});
	//startupAPI(req.db, getProp(req), res);
});

router.get('/features', function(req,res){
	var request = req.query;
	var name = request[0]
	try {
		var result = FeatureList.get(name);
		if (!result) res.send("List " + name + "does not exist!");
		else res.json(result);
	} catch (err) {
		res.send(err);
	}
});

router.post('/features', function(req, res){
	// TODO: considering not returning sent object (feature list may be very large)
	res.json(FeatureList.add(req.body.name, req.body.data));
});

router.get('/training/datasets', function(req, res){
	var request = req.query;
	var name = request[0]
	try {
		var result = TrainingSet.get(name);
		if (!result) res.send("List " + name + "does not exist!");
		else res.json(result);
	} catch (err) {
		res.send(err);
	}
});

router.post('/upload', function(req,res) {
    res.json(TrainingSet.add(req.body.name, req.body.data));
});


module.exports = router;
