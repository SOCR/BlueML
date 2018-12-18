require('async')
require('@tensorflow/tfjs-node')

const util = require('util');
const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const csv = require('fast-csv');

const readFile = util.promisify(fs.readFile);
const input = ["samples0.csv", "samples1.csv", "samples2.csv", "samples3.csv", "samples4.csv",
			   "samples5.csv", "samples6.csv", "samples7.csv", "samples8.csv", "samples9.csv",
			   "samples10.csv", "samples11.csv", "samples12.csv", "samples13.csv", "samples14.csv",
			   "samples15.csv", "samples16.csv", "samples17.csv", "samples18.csv", "samples19.csv"];
main();

async function main() {
	var train_x = [];
	var train_y = [[1], [1], [1], [1], [1], [1], [1], [1], [1], [1]];
	var test_x = [];

	for (let i = 0; i < input.length; ++i) {
		var set = [];
		let file = await readFile(input[i], 'utf8');
		let data = file.split(/\n/);
		for (let j = 2; j < data.length; ++j) {
			let f = parseFloat(data[j].split(",")[1]);
			if (! isNaN(f)) {
				set.push(f);
			}
		}
		if (i % 2 === 0) {
			train_x.push(set);
		} else {
			test_x.push(set);
		}
	}
	console.log("LOADING X==========");
	console.log(train_x);
	console.log("LOADING X TEST ====");
	console.log(test_x);
	console.log("LOADING END========");
    train(train_x, train_y, test_x);
}

async function train(x_in, y_in, x_test_in) {
	var x = tf.tensor(x_in);
	const y = tf.tensor(y_in);
	var x_test = tf.tensor(x_test_in);

	console.log(x);
	console.log(y);
	console.log(x_test);

	// Singular Value Decomposition
	// QR Factorization.
	let [q, r] = tf.linalg.qr(x);
	x = q.dot(r);

	let [q1, r1] = tf.linalg.qr(x_test);
	x_test = q1.dot(r1);

	console.log(x);
	console.log(x_test);

	// Fourier Transform
	// Need to cast to complex64
	x = tf.cast(x, 'complex64');
	x_test = tf.cast(x_test, 'complex64');

	x = x.fft();
	x_test = x_test.fft();

	console.log(x);
	console.log(x_test);

	const model = tf.sequential();

	// Add the layers.
	model.add(tf.layers.dense({
		inputShape: [x_in[0].length],
		activation: 'sigmoid',
		units: 10
	}));
	model.add(tf.layers.dense({
		units: 1,
		activation: 'sigmoid'
	}));

	// Compile the model.
	model.compile({
		optimizer:tf.train.sgd(8e-3),
		loss:'meanSquaredError'
	});

	// Wait for the model to fit x and y.
	await model.fit(x, y, {epochs: 1000});
	// Save the model.
	model.predict(x_test).print();
}

/*-----Original Main-----*/
/*
var x = [];
var y = [];
var t_time = [];
var t_signal = [];
var t_x = [];

async function Test() {
	var testStream = fs.createReadStream("test.csv");
	var t_csvStream = csv()
    	.on("data", function(data) {
    		t_time = t_time.concat(parseFloat(data[0]));
    		t_signal = t_signal.concat(parseFloat(data[1]));
    	})
    	.on("end", function() {
    		console.log("done");
    		t_x[0] = t_time.slice(2);
    		t_x[1] = t_signal.slice(2);
    		console.log("====================");
    		console.log(t_x);
    	});
	var p = testStream.pipe(t_csvStream);
	return p;
}
var counter = 0;
var y = [[1], [1]]
var inputFiles = ["samples0.csv", "samples1.csv", "samples2.csv", "samples3.csv", "samples4.csv", "samples5.csv"]
function addData() {
    inputFiles.forEach(d => {
    	var time = [];
        var signal = [];
    	var stream = fs.createReadStream(d);
		var csvStream = csv()
        	.on("data", function(data) {
    			time = time.concat(parseFloat(data[0]));
    			signal = signal.concat(parseFloat(data[1]));
    		})
    		.on("end", function() {
    			console.log("done");
    			if (counter === 0) {
   			        x[0] = time.slice(2);
    			    x[1] = signal.slice(2);   				
    			} else {
    				x[counter + 1] = signal.slice(2);
    				counter = counter + 1;
    			}
    			console.log(x);
    		});

    	var p = stream.pipe(csvStream);
    	return p;
    });
}

addData();
Test();

setTimeout(function after() {
    Training(x, y, t_x);
}, 15000);
*/


/*-----Main with CSV File (readFileAsync)-----*/
/*
// const readFileAsync = util.promisify(fs.readFile)
// var inputFiles = ["sample.csv"]
async function main() {
	inputFiles.forEach(d => {
		const text = await readFileAsync(d);
		console.log('CONTENT', text);
	});
}
*/

/*-----CSV Parse Code-----*/
/*
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='myfile.csv';

var parser = parse({delimiter: ','}, function (err, data) {
  async.eachSeries(data, function (line, callback) {
    // do something with the line
    doSomething(line).then(function() {
      // when processing finishes invoke the callback to move to the next one
      callback();
    });
  })
});
fs.createReadStream(inputFile).pipe(parser);
*/


