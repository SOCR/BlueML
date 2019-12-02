const fs = require('fs');
const GaussianNB = require('machinelearn/naive_bayes');

console.log("Running BlueML test.js")
const nb = new GaussianNB.GaussianNB();

const X_train_tf_data = fs.readFileSync('X_train_tf.csv', 'utf-8');
const X_train_tf = X_train_tf_data.split('\n').map(function(line){
	return line.split(",").map(x=>parseFloat(x));
});
X_train_tf.splice(-1,1)
// console.log(X_train_tf[X_train_tf.length-1]);

const y_train_tf_data = fs.readFileSync('y_train.csv', 'utf-8');
const y_train_tf = y_train_tf_data.split('\n').map(y=>parseFloat(y));
y_train_tf.splice(-1,1)
// console.log(y_train_tf[y_train_tf.length-1]);

nb.fit(X_train_tf, y_train_tf);

const X_perdict_data = fs.readFileSync('X_valid_tf.csv', 'utf-8');
const X_perdict_tf = X_perdict_data.split('\n').map(function(line){
	return line.split(",").map(x=>parseFloat(x));
});

const patient_id = 0;
const X_perdict_data_patient1 = X_perdict_tf[patient_id];
// console.log(X_perdict_data_patient1);
console.log("============================");
console.log("now predicting the");
console.log(patient_id + 1); // zero indexed in the csv file
console.log("patient data");
console.log("============================");
console.log("the prediction result is");
console.log(nb.predict([X_perdict_data_patient1])); // suppose return 0 in this case