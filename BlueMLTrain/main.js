
require('@tensorflow/tfjs-node')

const tf = require('@tensorflow/tfjs');
const util = require('util');
const  fs = require('fs');

const readFile = util.promisify(fs.readFile)

var normInput = ["samples_norm_one_min_sec_1.csv", "samples_norm_one_min_sec_2.csv", "samples_norm_one_min_sec_3.csv",
    "samples_norm_one_min_sec_4.csv", "samples_norm_one_min_sec_5.csv", "samples_norm_one_min_sec_6.csv",
    "samples_norm_one_min_sec_7.csv", "samples_norm_one_min_sec_8.csv", "samples_norm_one_min_sec_9.csv"]

var arrhythmiaInput = ["samples_arrhythmia_one_min_sec_100.csv", "samples_arrhythmia_one_min_sec_101.csv",
    "samples_arrhythmia_one_min_sec_102.csv", "samples_arrhythmia_one_min_sec_103.csv",
    "samples_arrhythmia_one_min_sec_104.csv", "samples_arrhythmia_one_min_sec_105.csv",
    "samples_arrhythmia_one_min_sec_106.csv", "samples_arrhythmia_one_min_sec_107.csv"]


var input = ["samples_arrhythmia_one_min_sec_100.csv", "samples_arrhythmia_one_min_sec_101.csv",
    "samples_arrhythmia_one_min_sec_102.csv", "samples_arrhythmia_one_min_sec_103.csv",
    "samples_arrhythmia_one_min_sec_104.csv", "samples_norm_one_min_sec_1.csv", "samples_norm_one_min_sec_2.csv",
    "samples_norm_one_min_sec_3.csv",
    "samples_norm_one_min_sec_4.csv", "samples_norm_one_min_sec_5.csv", "samples_arrhythmia_one_min_sec_100.csv",
    "samples_norm_one_min_sec_1.csv", "samples_norm_one_min_sec_7.csv", "samples_norm_one_min_sec_8.csv",
    "samples_norm_one_min_sec_9.csv"]


main();

async function main() {

    var train_x = [];
    var test_x = [];
    var train_y = [[1], [1], [1], [1], [1], [0], [0], [0], [0], [0]];
    for (let i = 0; i < input.length; i++) {
        var set = [];
        file = await readFile(input[i], 'utf8');
        data = file.split(/\n/);
        //for (let j = 2; j < data.length; j++) {
        console.log(data.length)
        for (let j = 2; j < 7679; j++) {
            set.push(parseFloat(data[j].split(",")[2]));
        }
        if (i < 10) {
            train_x.push(set);
        } else {
            test_x.push(set);
        }
    }


    /*

    let x = [];
    let y = [];
    let x_t = [];

    for (let i = 0; i < 3; ++i) {
        let file = await readFile(normInput[i], 'utf8');
        let dataStr = file.split(/\n/);
        let data =  [];
        console.log(dataStr.length);
        for (let j = 2; j < dataStr.length; ++j)  {
            let strs = dataStr[j].split(",");
            let row = [];
            row.push(parseFloat(strs[1]));
            row.push(parseFloat(strs[2]));
            data.push(row);
        }
        x.push(data);
        if (i == 1) x_t.push(data);
        //console.log(data);
        y.push(0);
    }
    console.log(x);
    */
    train(train_x, train_y, test_x)
}


async function train(x_in, y_in, x_test) {
    console.log("training");
    var x = tf.tensor(x_in), x_t = tf.tensor(x_test);

    const y = tf.tensor(y_in);


    // QR decomposition
    let [q, r] = tf.linalg.qr(x);
    let x_approx = q.dot(r);

    let [q_, r_] =  tf.linalg.qr(x_t);
    let x_t_approx = q_.dot(r_);

    // Fourier Transform
    x_approx = tf.cast(x_approx, 'complex64').fft();
    x_t_approx = tf.cast(x_t_approx, 'complex64').fft();

    const model = tf.sequential();
    //config for layer
    const config_hidden = {
        inputShape: [x_in[0].length],
        activation:'sigmoid',
        units:10
    }
    const config_output={
        units:1,
        activation:'sigmoid'
    }
    console.log(x_t_approx)
    //defining the hidden and output layer
    const hidden = tf.layers.dense(config_hidden);
    const output = tf.layers.dense(config_output);
    //adding layers to model
    model.add(hidden);
    model.add(output);
    //define an optimizer
    const optimize=tf.train.sgd(0.1);
    //config for model
    const config={
        optimizer:optimize,
        loss:'meanSquaredError'
    }

    //compiling the model
    model.compile(config);
    console.log('Model Successfully Compiled');

    await model.fit(x_approx, y, {apochs: 1000})
    //await model.save("file://./trainedModel");


    return await model.predict(x_t_approx).print()
}





/*


const model = tf.sequential();
//config for layer
const config_hidden = {
    inputShape:[3],
    activation:'sigmoid',
    units:4
}
const config_output={
    units:2,
    activation:'sigmoid'
}
//defining the hidden and output layer
const hidden = tf.layers.dense(config_hidden);
const output = tf.layers.dense(config_output);
//adding layers to model
model.add(hidden);
model.add(output);
//define an optimizer
const optimize=tf.train.sgd(0.1);
//config for model
const config={
    optimizer:optimize,
    loss:'meanSquaredError'
}
//compiling the model
model.compile(config);
console.log('Model Successfully Compiled');
//Dummy training data
const x_train = tf.tensor([
    [0.1,0.5,0.1],
    [0.9,0.3,0.4],
    [0.4,0.5,0.5],
    [0.7,0.1,0.9]
])
//Dummy training labels
const y_train = tf.tensor([
    [0.2,0.8],
    [0.9,0.10],
    [0.4,0.6],
    [0.5,0.5]
])
//Dummy testing data
const x_test = tf.tensor([
    [0.9,0.1,0.5]
])

train_data().then(function(){
    console.log('Training is Complete');
    console.log('Predictions :');
    model.predict(x_test).print();
})
async function train_data(){
    for(let i=0;i<10;i++){
        const res = await model.fit(x_train,y_train,epoch=1000,batch_size=10);
        console.log(res.history.loss[0]);
    }
}

*/