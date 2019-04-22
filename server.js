// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
	
// config files
// var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// app.get('/rest/results',
//     (req, res) => {
//         console.log('Uploading file...');
//         // var filename = req.file.filename;
//         // var suffixname = req.file.filename.substr(req.file.filename.lastIndexOf(".")).toLowerCase();
//         // var filezie = req.file.size;
//         // if (filename[0] > 'k' ) {
//             // var disease = "something";
//         // }
//         // else if (filename[0] < 'k') {
//             // var disease = ""
//         // }
//         var filename = "test.eeg";
//         var disease = "epileptic seizure";
//         var temp = Math.floor(Math.random() * 10);
//         console.log(temp);
//         var template = {}
//         if(temp > 5) {
//             template = {
//                 filename: filename,
//                 disease: disease,
//                 model: "Neural Network Model",
//                 dataset: "Seizure Recognition Dataset",
//                 accuracy: "99%",
//                 symptoms: ["Uncontrollable jerking movements of the arms and legs", "Loss of consciousness or awareness", "Psychic symptoms such as fear, anxiety or deja vu"],
//                 treatments: ["Anti-epileptic drugs", "Vagus nerve stimulator", "Brain surgery"],
//                 status_code: 200
//             }
//         }
//         else{
//             template = {filename: filename,
//                 disease: "none",
//                 model: "Neural Network Model",
//                 dataset: "Seizure Recognition Dataset",
//                 accuracy: "99%",
//                 symptoms:  [],
//                 treatments: [],
//                 status_code: 200}
//         }
//         console.log(template);
//         res.send(template);
// });

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes
// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app


