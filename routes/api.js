var express = require('express');
var router = express.Router();



router.get('/request', function(req, res){
 	process.on('uncaughtException', function (err) {
	  res.send("ERROR: Invalid Request")
	  console.log(err);
	}); 
	//startupAPI(req.db, getProp(req), res);
});



module.exports = router;
