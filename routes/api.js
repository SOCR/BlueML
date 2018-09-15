var express = require('express');
var router = express.Router();
// var multer = require('multer');
var FeatureList = require('../public/js/featureListSchema.js');
var TrainingList = require('../public/js/trainingListSchema.js');

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
	for(var ftr in request) {
		FeatureList.findOne({feature: request[ftr]}, function(feat, err) {
			if(err) {
				res.send(err);
			} else {
				if(!feat) {
					res.send("feature " + ftr + " does not exist");
				} else {
					res.json(feat);
				}
			}
		});
	}
});

router.post('/features', function(req, res){
	//post feature(s) in req to list in DB
	var request = req.query;
	var fList = [];
	for (var ftr in request) {
		fList.append({name: ftr.name, minValue: ftr.min, maxValue: ftr.max});
	}
	FeatureList.create({
		list: fList
	}).then(featList =>{
		res.json(featList)
	});
});

router.get('/training/datasets', function(req, res){
	var request = req.query;
	var tList = [];
	for (var lis in request) {
        TrainingList.findOne({trainingSet: lis}, function (set, err) {
            if (err) {
                res.send(err);
            } else {
                if (!set) {
                    res.send("list with name " + lis['name'] + " does not exist");
                } else {
                	tList.append(set);
                }
            }
        });
    }
    res.json({list: tList});
});

router.post('/upload', function(req,res) {
    var request = req.query;
    var tList = [];
    for (var lis in request.list) {
        tList.append({name: lis.name, data: lis.data});
    }
    TrainingList.create({
        list: tList
    }).then(trainList =>{
        res.json(trainList)
    });
});

// //fix multer code and turn it into MongoDB because we access from DB not from disk
//
// var storage = multer.diskStorage({
//     destination:function(req, file, callback){
//         callback(null, '/:userID/upload/:dataset')
//     },
//     filename: function(req, file, callback){
//         callback(null, file.originalname + '-' + Date.now());
//     }
// });
//
// var upload = multer({ storage : storage }).array('userTrainingData',12);
// router.get('/rest/training/Datasets', function(req, res) {
//     var location = __dirname + '/rest/training/Datasets';
//     res.sendFile(location);
// });
//
// router.post('/upload', function(req, res) {
//     upload(req,res,function(err) {
//         if(err) {
//             return res.end("Error uploading file.");
//         }
//         res.end("File is uploaded");
//     });
// });

module.exports = router;
