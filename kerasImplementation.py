# Import Statements
import numpy as np
np.random.seed(498) # for reproducibility
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import normalize

import tensorflow as tf
import keras
from keras.models import Model, Sequential
from keras.layers import Embedding
from keras.layers import Dense, Input, Flatten, Concatenate, Reshape, Activation
from keras.layers import Conv1D, MaxPooling1D, Embedding, Dropout, LSTM, GRU, Bidirectional, TimeDistributed, RNN

# Data pipeline and preprocessing
df = pd.read_csv("data.csv")
y = df.y
x = []
x_columns = df.columns[1:-1]
for _, i in df.iterrows():
	x_datapoint = []
	for j in x_columns:
		x_datapoint.append(i[j])
	x.append(x_datapoint)
# print(x[0])
x = np.array(x)
# x = normalize(x)
scaler = MinMaxScaler(feature_range=(0, 1))
scaler.fit(x)
x = scaler.fit_transform(x)
print(scaler.data_max_, scaler.data_min_)

x = np.expand_dims(x, axis=2)
y = keras.utils.to_categorical(y)
print("Y:", y.shape)
print("X:", x.shape)
idx = np.random.permutation(len(y))
y = y[idx]
x = x[idx]
x_train = x[0:10000]
y_train = y[0:10000]
x_test = x[10000:]
y_test = y[10000:]

# Model Definition
l_input = Input(shape=(178,1), dtype='float32')
l_conv_1 = Conv1D(10, 5)(l_input)
l_maxpool_1 = MaxPooling1D()(l_conv_1)
l_flatten_1 = Flatten()(l_maxpool_1)
predictions = Dense(6, activation='sigmoid')(l_flatten_1)
model = Model(inputs=l_input, outputs=predictions)
model.compile(loss='categorical_crossentropy', optimizer='Adam', metrics=['acc'])

model.summary()

model.fit(x_train, y_train, epochs=1, batch_size=100, validation_data=(x_test, y_test))
test=[386,382,356,331,320,315,307,272,244,232,237,258,212,2,-267,-605,-850,-1001,-1109,-1090,-967,-746,-464,-152,118,318,427,473,485,447,397,339,312,314,326,335,332,324,310,312,309,309,303,297,295,295,293,286,279,283,301,308,285,252,215,194,169,111,-74,-388,-679,-892,-949,-972,-1001,-1006,-949,-847,-668,-432,-153,72,226,326,392,461,495,513,511,496,479,453,440,427,414,399,385,385,404,432,444,437,418,392,373,363,365,372,385,388,383,371,360,353,334,303,252,200,153,151,143,48,-206,-548,-859,-1067,-1069,-957,-780,-597,-460,-357,-276,-224,-210,-350,-930,-1413,-1716,-1360,-662,-96,243,323,241,29,-167,-228,-136,27,146,229,269,297,307,303,305,306,307,280,231,159,85,51,43,62,63,63,69,89,123,136,127,102,95,105,131,163,168,164,150,146,152,157,156,154,143,129]
test=np.array(test).reshape((1,178,1))
prediction=model.predict(test)
print(prediction)
# model.save('modelkerasimple.h5')
print("Done")