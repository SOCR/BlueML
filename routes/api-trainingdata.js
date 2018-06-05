var express = require('express');
var app = express();
var multer = require('multer');

var storage = multer.diskStorage({
    destination:function(req, file, callback){
        callback(null, '/:userID/upload/:dataset')
    },
    filename: function(req, file, callback){
        callback(null, file.originalname + '-' + Date.now());
    }
});

var upload = multer({ storage : storage }).array('userTrainingData',12);
app.get('/rest/training/Datasets', function(req, res) {
    var location = __dirname + '/rest/training/Datasets';
    res.sendFile(location);
});

app.post('/upload', function(req, res) {
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
    res.end("File is uploaded");
    });
});