var express = require('express');
var router = express.Router();

/* GET all datasets. */
router.get('/var/:id', function(req, res){
	var db=req.db;
	db.collection('var').find({name:req.params.id}).toArray(function(err, items){
		res.json(items);
	})
});



module.exports = router;

