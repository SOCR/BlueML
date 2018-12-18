const a = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
const c = tf.variable(tf.scalar(Math.random()));
const d = tf.variable(tf.scalar(Math.random()));

// TODO: change this implementation to provide the initial classification
function predict(x) {
  // y = a * x ^ 3 + b * x ^ 2 + c * x + d
  //return tf.tidy(() => {
  //  return a.mul(x.pow(tf.scalar(3))) // a * x^3
  //    .add(b.mul(x.square())) // + b * x ^ 2
  //    .add(c.mul(x)) // + c * x
  //    .add(d); // + d
  //});
}

// takes in 1D tensors as input
function fourier(real, imag) { 
	const x = tf.complex(real, imag);
	return x.fft();
}

/**
 * need node-gyp to be available as a command within the environment, then:
 * npm install node-svd
 *
 *
 * @param A [row1, row2 ...] matrix to apply svd onto
 * @param dim the number of singular values to keep, 0 for all (default)
 * @param settings { U, V, debug }
 * @return {d, U, S, V}
 */
function svdimplement(){
	var svd = require('svd').svd;
	var res = svd(myMatrix, dim, settings);
	return res; // contains res.d, res.U, res.S, res.V
}

function loss(predictions, labels) {
  // Subtract our labels (actual values) from predictions, square the results,
  // and take the mean.
  const meanSquareError = predictions.sub(labels).square().mean();
  return meanSquareError;
}

function train(xs, ys, numIterations = 75) {

  const learningRate = 0.5;
  const optimizer = tf.train.sgd(learningRate);
  
  for (let iter = 0; iter < numIterations; iter++) {
    optimizer.minimize(() => {
      const predsYs = predict(xs);
      return loss(predsYs, ys);
    });
  }
}