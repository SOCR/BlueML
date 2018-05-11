var express = require('express');
var router = express.Router();
var Feature = require('../public/js/features.js');


router.get('/request', function(req, res){
 	process.on('uncaughtException', function (err) {
	  res.send("ERROR: Invalid Request")
	  console.log(err);
	});
	//startupAPI(req.db, getProp(req), res);
});

router.get('/features', function(req,res){
	console.log('get features');

	var request = req.query;
	for(var feature in request) {
		Feature.findOne({feature: request[feature]}, function(feat, err) {
			if(err) {
				res.send(err);
			} else {
				if(!feat) {
					res.send("feature " + feature + " does not exist");
				} else {
					res.json(feature);
				}
			}
		});
	}
});



module.exports = router;
