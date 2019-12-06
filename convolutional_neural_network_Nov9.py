import numpy as np
import os
os.environ["PATH"] += os.pathsep + 'C:/Program Files (x86)/Graphviz2.38/bin/'

#configuring keras
import tensorflow.keras as keras
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, BatchNormalization, Conv2D, Dense, Dropout, Flatten, GaussianDropout
from tensorflow.keras.utils import plot_model
import data_processing_Nov9 as dp
from tensorflow.keras.callbacks import History 

# NOTE: comment the next line if running more than once back-to-back
dp.save_data('data.csv', binary=1, augment=0)
eeg_data, labels = dp.load_data()

inputs = Input(shape=(178, 1, 1))
x = GaussianDropout(0.1)(inputs)
x = Conv2D(24, kernel_size=(5, 1), strides=3, activation="relu")(x)
x = BatchNormalization()(x)
x = Conv2D(16, (3,1), strides=2, activation="relu")(x)
x = BatchNormalization()(x)
x = Conv2D(8, (3,1), strides=2, activation="relu")(x)
x = BatchNormalization()(x)
x = Flatten()(x)
x = Dense(20)(x)
x = Dropout(0.3)(x)
predictions = Dense(units=2, activation="softmax")(x)

model = Model(inputs, predictions)
plot_model(model, to_file='ANN_Conv2D_AutoAug__BinaryClass.png', show_shapes=True)

adam = keras.optimizers.Adam(lr=0.0001, beta_1=0.9, beta_2=0.999, epsilon=None, decay=0.0, amsgrad=False)
history = History()
model.compile(adam, loss='categorical_crossentropy', metrics=['accuracy'])

csv_logger = keras.callbacks.CSVLogger("ANN_Conv2D_AutoAug__BinaryClass", separator=',', append=False)
es = keras.callbacks.EarlyStopping(patience=10)

model.fit(eeg_data, labels, epochs=50, verbose=1, validation_split=0.1, callbacks=[es, csv_logger, history])

import matplotlib.pyplot as plt
plt.plot([None] + history.history['accuracy'], 'o-')
plt.plot([None] + history.history['val_accuracy'], 'x-')
# Plot legend and use the best location automatically: loc = 0.
plt.legend(['Train acc', 'Validation acc'], loc = 0)
plt.title('Training/Validation acc per Epoch')
plt.xlabel('Epoch')
plt.ylabel('acc')
plt.show()

model.save("ANN_Conv2D_AutoAug_BinaryClass.h5")