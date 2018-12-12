BlueML
==========================

1. ensure the [node framework](https://nodejs.org/en/) has been installed


2. navigate to the root directory of the project in node, and run `npm install`

2. once dependencies are installed, launch node server: `npm start`

3. navigate to selected address in browser to launch webapp (default is [http://localhost:8080/](http://localhost:8080/))

BlueML Offline Training
===========================
 See tensorflow-py file. This is the backend asynchronous Tensorflow application for BlueML. The project is based on DeepHeart (https://github.com/jisaacso/DeepHeart) in predicting
 cardiac abnormalities from phonocardiogram (PCG) data. It is difficult to predict patient health from PCG data 
 because of noise from several sources: talking, breathing, intestinal 
 sounds, etc.
 
 Ideally the raw wav files would be fed into a very deep Tensorflow
 network and, with some careful regularization, the model would learn 
 to accurately separate signal from noise. To reduce the cost of
 training, the number of hidden units is reduced in favor of
 some old school feature engineering: the fast fourier transform (FFT) and Singular Value Decomposition (SVD). 
 The FFT is a signal processing technique for converting a signal into
 a frequency domain. The original signal is also filtered with a high
 pass Butterworth filter aimed at removing noise above 4Hz (or 240 beats
 per minute). The filtered signal is again transformed to it's approximate
 frequency domain. A combination of the above fourier coefficients are 
 fed into the convolutional neural network. The SVD is a dimension reduction technique for narrowing the number of features.

 The reasons we adopt Tensorflow instead of Tensorflow JS are that a. it is still under active and intensive development and b. it lacks important functions such as SVD (generally, for rank reduction, unless you know the original matrix is indeed rank deficient, you should use SVD instead of QRD).
 
# Installing

To run, set up a virtual environment (ensure python2.7, virtualenv, and 
pip are in your PATH)

```
>> cd backend
>> virtualenv env
>> source env/bin/activate
>> pip install -r requirements.txt
```

Download the physionet dataset 

```
>> wget http://physionet.org/physiobank/database/challenge/2016/training.zip
>> unzip training.zip

```

Download Tensorflow and Tensorflow JS
```
>> apt-get install tensorflow
>> apt-get install tensorflowjs
```

Modify the correct input path, output path and output node name in config.json
```
"saved_model_dir":"/tmp/saved-model/",
"output_dir":"/tmp/tfjs-model/",
"output_node_names":"MobilenetV1/Predictions/Reshape_1"
```

Build a feature vector from the raw data and train the CNN
```
>> python deepheart/train_model.py <path_to_physionet_data> <do load previously saved data>
e.g.,
>> python deepheart/train_model.py training-f
```

Note: by default this saves tensorboard statistics to /tmp which can
be launched using
```
>> tensorboard --logdir=/tmp/train
```

# Performance
Currently physionet data is scoring using the mean of sensitivity and
specificity (Fraction of True positives and True Negatives). These summaries
are calculated and logged in tensorboard as well as printed to terminal.

Currently, the tensorflow CNN model converges to a mean score of
 0.78. 
 
# Disclaimer
This software is not intended for diagnostic purposes. It is only designed
for the physionet data science studies. All statements have not been evaluated by the FDA. 
This product is not intended to diagnose, treat, cure, or prevent any disease.
