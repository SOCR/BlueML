require('@tensorflow/tfjs-node')
require('async')

const util = require('util')
const tf = require('@tensorflow/tfjs')
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

var inputFile = ["data/arr_0.csv", "data/arr_1.csv", "data/arr_2.csv", "data/arr_3.csv", "data/arr_4.csv",
    "data/normal_0.csv", "data/normal_1.csv", "data/normal_2.csv", "data/normal_3.csv", "data/normal_4.csv", "data/arr_5.csv", "data/normal_5.csv"];

async function myEKGTrain(x_dat, y_dat, x_test) {
    var x = tf.tensor(x_dat);
    const y = tf.tensor(y_dat);
    var x_t = tf.tensor(x_test);

    // Singular Value Decomposition
    let [q, r] = tf.linalg.qr(x);
    x = q.dot(r);

    let [s, t] = tf.linalg.qr(x_t);
    x_t = s.dot(t);

    // Fourier Decomposition
    x = tf.cast(x, 'complex64');
    x = x.fft();

    x_t = tf.cast(x_t, 'complex64');
    x_t = x_t.fft();

    // Building TF model
    const model = tf.sequential();

    const config_hidden = {
        inputShape: [x_dat[0].length],
        activation: 'sigmoid',
        units: 10
    }
    const config_output={
        units: 1,
        activation:'relu'
    }

    const hidden = tf.layers.dense(config_hidden);
    const output = tf.layers.dense(config_output);

    model.add(hidden);
    model.add(output);

    const optimize=tf.train.sgd(8e-3);

    const config={
        optimizer:optimize,
        loss:'meanSquaredError'
    }

    model.compile(config);

    await model.fit(x, y, { epochs: 500 });
    await model.save("file://./my-model-1");
    console.log("Finish Training");

    // Predict the outcomes: 1 : 0
    await model.predict(x_t).print();
}

async function execute(input) {
    var train_x = [];
    var test_x = [];
    var train_y = [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0]];

    for (let i = 0; i < input.length; i++) {
        var set = [];
        file = await readFile(input[i], 'utf8');
        data = file.split(/\n/);

        //for (let j = 2; j < data.length; j++) {
        for (let j = 2; j < 7679; j++) {
            set.push(parseFloat(data[j].split(",")[2]));
        }

        if (i < 10) {
            train_x.push(set);
        } else {
            test_x.push(set);
        }
    }

    myEKGTrain(train_x, train_y, test_x);
}

execute(inputFile);

/*
const Papa = require('papaparse')
function parseData(input, callBack) {
    const file = fs.createReadStream(input);
    var data = [];
    var temp = [];
    var header = 2;

    Papa.parse(file, {
        worker: true, // Don't bog down the main thread if its a big file
        step: function (result) {
            if (header === 0) {
                temp.push(parseFloat(result.data[0][1]));
                count++;
            } else {
                header--;
            }
        },
        complete: function (results, file) {
            data.push(temp);
            console.log(data[0][0] + "," + data[0][1] + "\n....");
            console.log('parsing complete read', count, 'records.');
            callBack(data, [[1]]);
        }
    });
}
*/
//parseData(inputFile, myEKGTrain);
