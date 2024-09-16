const http = require('http');
import * as tf from '@tensorflow/tfjs';

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

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});