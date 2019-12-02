// var Results = require('./models/Results');
const tfn = require('@tensorflow/tfjs-node');
const fse = require('fs-extra');
var fs = require('fs');
var csv = require('fast-csv');

module.exports = function(app) {
    console.log('in routes.js');
    // ===========================================================
    app.get('/rest/results', async function(req, res) {
        console.log('Getting results...');
        var filename = "/Users/junzhejiang/Desktop/eeg_blueMl/data.csv";
        var disease = "epileptic seizure";
        var data = fs.readFileSync(filename, 'utf-8');
        console.log("======= test test test");
        const data_tf = data.split('\n').map(function(line){
            return line.split(",").map(x=>parseFloat(x));
        });

        // console.log("result ====== ");
        // console.log(data);
        // console.log(data_tf[1]);

        var result = ["1"];
        var outcome = "false";
        for (var i = 1; i< 50; i++) {
            console.log(i);
            var test_patient = data_tf[i].splice(1)


            console.log(test_patient);
            // var test_patient=[386,382,356,331,320,315,307,272,244,232,237,258,212,2,-267,-605,-850,-1001,-1109,-1090,-967,-746,-464,-152,118,318,427,473,485,447,397,339,312,314,326,335,332,324,310,312,309,309,303,297,295,295,293,286,279,283,301,308,285,252,215,194,169,111,-74,-388,-679,-892,-949,-972,-1001,-1006,-949,-847,-668,-432,-153,72,226,326,392,461,495,513,511,496,479,453,440,427,414,399,385,385,404,432,444,437,418,392,373,363,365,372,385,388,383,371,360,353,334,303,252,200,153,151,143,48,-206,-548,-859,-1067,-1069,-957,-780,-597,-460,-357,-276,-224,-210,-350,-930,-1413,-1716,-1360,-662,-96,243,323,241,29,-167,-228,-136,27,146,229,269,297,307,303,305,306,307,280,231,159,85,51,43,62,63,63,69,89,123,136,127,102,95,105,131,163,168,164,150,146,152,157,156,154,143,129];
            const testTensor = tfn.tensor4d(test_patient, [1, test_patient.length, 1, 1]);
            const model = await
            tfn.loadLayersModel('file://model.json');
            const prediction = model.predict(testTensor).arraySync()[0][0];
            var number_prediction = 1;
            console.log('prediction is');

            console.log(prediction);

            var template = {}
            var prediction_result = "get_result";
            if (prediction >0.5) {
                prediction_result = "Have desease";
                outcome = "true";
            }
            if (prediction <0.5) {
                prediction_result = "Have no desease";

            }
            result[i] = prediction_result;

        }

            if (outcome == "true") {
                template = {
                    filename: filename,
                    userID: number_prediction,
                    disease: disease,
                    model: "Neural Network Model",
                    dataset: "Seizure Recognition Dataset",
                    accuracy: "99%",
                    prediction: result,
                    symptoms: ["Uncontrollable jerking movements of the arms and legs", "Loss of consciousness or awareness", "Psychic symptoms such as fear, anxiety or deja vu"],
                    treatments: ["Anti-epileptic drugs", "Vagus nerve stimulator", "Brain surgery"]
                }
            } else {
                template = {
                    filename: filename,
                    disease: "none",
                    userID: number_prediction,
                    model: "Neural Network Model",
                    dataset: "Seizure Recognition Dataset",
                    prediction: result,
                    accuracy: "95%",
                    symptoms: [],
                    treatments: []
                }
            }
            console.log(template);
            res.send(template);

    });

    app.post('/rest/testing/datasets/upload', function(req, res) {
        console.log('Successfully submitted the file, in routes.js');
        var return_result = 'successful';
        // const multer = require('multer');
        // const upload = multer({ storage: multer.memoryStorage() })

        // app.post(
                // '/users/bulkUpload',
                // upload.single('csvFile'),
                // this.usersRoutes.uploadUserData
         // );
         var fstream;
         req.pipe(req.busboy);
         console.log('here');
         req.busboy.on('file', function(fieldname, file, filename) {
            console.log("Uploading: " + filename);
            fstream = fse.createWriteStream("data_test.csv");
            file.pipe(fstream);
            fstream.on('close', function(){
                res.send(return_result);
            });
        });
    });



    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        // res.sendfile('./public/views/index.html'); // load our public/index.html file // OLD
        res.render("index"); // NEW, WITH PUG
    });

};
