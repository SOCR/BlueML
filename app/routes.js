// var Results = require('./models/Results');
const tfn = require('@tensorflow/tfjs-node');
const new depencies = require('javascript.io/new_commit')
module.exports = function(app) {
    console.log('in routes.js');
    // ===========================================================
    app.get('/rest/results', async function(req, res) {
        console.log('Getting results...');
        console.log("======= Naive Bayes");
        const fs = require('fs');
        const GaussianNB = require('machinelearn/naive_bayes');
        const tfn = require('@tensorflow/tfjs-node');

        console.log("Running BlueML test.js")
        const nb = new GaussianNB.GaussianNB();

        const X_train_tf_data = fs.readFileSync('app/bayes/X_train_tf.csv', 'utf-8');
        const X_train_tf = X_train_tf_data.split('\n').map(function(line){
            return line.split(",").map(x=>parseFloat(x));
        });
        X_train_tf.splice(-1,1);
        // console.log(X_train_tf[X_train_tf.length-1]);

        const y_train_tf_data = fs.readFileSync('app/bayes/y_train.csv', 'utf-8');
        const y_train_tf = y_train_tf_data.split('\n').map(y=>parseFloat(y));
        y_train_tf.splice(-1,1)
        // console.log(y_train_tf[y_train_tf.length-1]);

        nb.fit(X_train_tf, y_train_tf);


        // var filename = "app/bayes/X_valid_tf.csv";
        // const X_perdict_data = fs.readFileSync('app/bayes/X_valid_tf.csv', 'utf-8');
        // const X_perdict_tf = X_perdict_data.split('\n').map(function(line){
        //     return line.split(",").map(x=>parseFloat(x));
        // });


        var filename = "/Users/junzhejiang/Desktop/eeg_blueMl/data.csv";
        var file = "data.csv";
        var disease = "epileptic seizure";
        var data = fs.readFileSync(filename, 'utf-8');
        var data_tf = data.split('\n').map(function(line){
            return line.split(",").map(x=>parseFloat(x));
        });
        var result = ["1"];
        var outcome = "false";
        var template = []
        var number = 0;
        var number_prediction = 1;
        var row_number = 0;
        var j = 1;
        var check_row = [0,0];

        for (;;j++) {
            check_row = data_tf[j];
            if(!check_row)
                break;
            row_number = row_number+1;
        }

        const data_tf_cnn = data.split('\n').map(function(line){
            return line.split(",").map(x=>parseFloat(x));
        });
        for (var i = 1; i< 50; i++) {
        console.log(row_number);
        console.log("result ====== ");
        var test_patient = data_tf[i].splice(1)
        console.log(data_tf);
        const patient_id = 0;
        const test = test_patient;
            var sd = [162.55, 162.90, 161.18, 159.55, 158.92, 159.53, 159.71, 160.65, 161.74, 161.42, 161.20, 161.32, 165.46, 170.22, 172.19, 169.90, 163.80, 160.47, 160.28, 158.65, 158.83, 162.83, 169.45, 172.24, 170.55, 166.61, 164.05, 164.05, 163.41, 161.42, 159.51, 159.99, 161.00, 161.40, 161.22, 160.65, 162.56, 165.97, 166.02, 163.14, 159.50, 157.18, 156.81, 158.34, 160.06, 162.75, 168.02, 169.63, 166.95, 162.27, 158.15, 156.07, 157.73, 160.97, 163.07, 160.49, 157.80, 157.66, 160.66, 164.68, 165.64, 162.33, 157.36, 157.00, 160.03, 162.10, 162.25, 160.61, 159.59, 159.21, 160.02, 161.06, 162.39, 161.68, 160.99, 161.24, 160.83, 160.45, 158.38, 158.96, 163.15, 169.13, 168.23, 162.77, 160.04, 160.22, 162.71, 163.50, 163.25, 164.22, 166.04, 165.45, 161.68, 159.72, 162.16, 165.33, 168.34, 168.09, 168.35, 171.44, 174.11, 173.14, 172.05, 168.86, 167.69, 166.29, 163.44, 163.79, 165.79, 168.33, 168.15, 165.47, 161.20, 161.17, 163.94, 164.36, 161.58, 160.34, 160.72, 158.31, 155.24, 157.89, 163.62, 167.64, 166.12, 161.98, 159.25, 158.17, 156.63, 155.47, 156.07, 158.91, 160.69, 161.22, 162.68, 165.06, 166.45, 166.12, 165.40, 164.52, 164.33, 165.25, 166.98, 168.36, 168.65, 169.82, 169.97, 168.29, 168.79, 169.81, 169.49, 165.96, 163.73, 166.16, 169.53, 169.57, 168.47, 169.12, 171.09, 172.73, 173.38, 170.24, 167.82, 167.46, 166.66, 165.42, 166.69, 167.04, 165.40, 164.04, 164.68, 167.10, 167.14, 165.30, 162.61, 161.29, 161.56, 163.90];
            var mean = [-11.59, -10.87, -10.27, -9.41, -8.51, -7.58, -7.06, -7.35, -6.98, -6.25, -5.50, -5.30, -5.81, -6.07, -6.17, -5.85, -5.38, -5.21, -5.02, -5.16, -5.26, -5.58, -5.91, -6.04, -5.53, -4.76, -4.45, -4.56, -5.22, -5.92, -6.24, -6.09, -5.43, -4.51, -3.94, -4.18, -4.99, -6.28, -7.31, -7.57, -7.04, -6.03, -5.10, -4.52, -4.72, -5.54, -6.61, -7.79, -8.46, -8.99, -8.89, -8.55, -7.98, -7.06, -6.51, -6.28, -7.12, -8.70, -10.57, -12.21, -12.73, -12.37, -11.22, -9.65, -8.31, -7.30, -6.97, -6.61, -6.39, -5.61, -4.80, -3.91, -3.79, -4.35, -5.37, -6.03, -6.46, -6.71, -7.32, -8.46, -9.83, -10.76, -11.13, -10.73, -10.23, -9.55, -9.02, -8.72, -8.62, -8.46, -8.01, -7.12, -6.30, -5.79, -5.65, -6.07, -6.64, -7.39, -7.72, -7.85, -7.55, -7.11, -7.45, -8.62, -9.68, -10.69, -10.45, -10.10, -10.03, -9.69, -9.01, -8.25, -8.13, -8.81, -9.62, -9.97, -9.59, -8.83, -8.33, -7.32, -6.82, -6.93, -8.01, -9.03, -9.77, -9.99, -9.47, -9.11, -8.19, -7.77, -7.74, -8.09, -8.31, -7.33, -6.14, -5.51, -5.50, -6.18, -7.10, -7.96, -8.34, -8.60, -8.42, -8.39, -8.16, -7.88, -7.51, -7.25, -7.06, -6.84, -6.35, -5.36, -4.97, -4.49, -3.90, -3.31, -2.93, -2.89, -3.57, -4.64, -6.39, -8.18, -9.65, -10.37, -10.58, -10.51, -10.69, -10.70, -11.04, -11.98, -14.20, -16.00, -16.99, -16.18, -14.92, -13.40, -11.89, -10.78];
            const testTensor = tfn.tensor2d(test, [test.length, 1]);
            const sdTensor = tfn.tensor2d(sd, [sd.length, 1]);
            const meanTensor = tfn.tensor2d(mean, [mean.length, 1]);
            const standardizationTestTensor = testTensor.sub(meanTensor).div(sdTensor).expandDims();
            standardizationTestTensor.print();
            console.log(standardizationTestTensor);

        // console.log(X_perdict_data_patient1);
        console.log("============================");
        console.log("now predicting the");
        console.log(patient_id + 1); // zero indexed in the csv file
        console.log("patient data");
        console.log("============================");
        console.log("the prediction result is");
        const prediction = nb.predict([test]);
        console.log(prediction); // suppose return 0 in this case
            var prediction_result = "get_result";
            if (prediction > 0.5) {
                prediction_result = "Have desease";
                outcome = "true";
                number = number+1;
            }
            if (prediction < 0.5) {
                prediction_result = "Have no desease";
            }

            const testTensor_cnn = tfn.tensor4d(test_patient, [1, test_patient.length, 1, 1]);
            const model_cnn = await
            tfn.loadLayersModel('file://model.json');
            const prediction_cnn = model_cnn.predict(testTensor_cnn).arraySync()[0][0];

            if (prediction_cnn > 0.5) {
                prediction_result = "Have desease";
                outcome = "true";
                number = number+1;
            }
            if (prediction_cnn < 0.5) {
                prediction_result = "Have no desease";
            }




            if (outcome == "true") {
                // template = {
                //     filename: filename,
                //     userID: number_prediction,
                //     disease: disease,
                //     model: "Neural Network Model",
                //     dataset: "Seizure Recognition Dataset",
                //     accuracy: "99%",
                //     prediction: prediction_result,
                //     symptoms: ["Uncontrollable jerking movements of the arms and legs", "Loss of consciousness or awareness", "Psychic symptoms such as fear, anxiety or deja vu"],
                //     treatments: ["Anti-epileptic drugs", "Vagus nerve stimulator", "Brain surgery"]
                // }
                template.push({'number' :  number,'patient' : row_number,'filename': file,'userID': number_prediction, 'disease': disease,'model': "Neural Network Model",'dataset': "Seizure Recognition Dataset",'accuracy': "99%",'prediction': prediction_result,'prediction2': prediction_result,'symptoms': ["Uncontrollable jerking movements of the arms and legs", "Loss of consciousness or awareness", "Psychic symptoms such as fear, anxiety or deja vu"], 'treatments': ["Anti-epileptic drugs", "Vagus nerve stimulator", "Brain surgery"]})
            }
            else {
                // template = {
                //     filename: filename,
                //     disease: "none",
                //     userID: number_prediction,
                //     model: "Neural Network Model",
                //     dataset: "Seizure Recognition Dataset",
                //     prediction: prediction_result,
                //     accuracy: "95%",
                //     symptoms: [],
                //     treatments: []
                // }
                template.push({'number' :  number,'patient' : row_number,'filename': file,'userID': number_prediction, 'disease': disease,'model': "Neural Network Model",'dataset': "Seizure Recognition Dataset",'accuracy': "99%",'prediction': prediction_result,'prediction2': prediction_result,'symptoms': ["Uncontrollable jerking movements of the arms and legs", "Loss of consciousness or awareness", "Psychic symptoms such as fear, anxiety or deja vu"], treatments: ["Anti-epileptic drugs", "Vagus nerve stimulator", "Brain surgery"]})
            }
            number_prediction = number_prediction+1;
        }
        console.log(number);
        console.log(template);
        res.send(template);
    });

    app.post('/rest/testing/datasets/upload', function(req, res) {
        console.log('Successfully submitted the file, in routes.js');
        var return_result = 'successful';

        var fstream;
        req.pipe(req.busboy);
        console.log('here');
        req.busboy.on('file', function(fieldname, file, filename) {
            console.log("Uploading: " + filename);
            fstream = fse.createWriteStream("uploads/data_test.csv");
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
