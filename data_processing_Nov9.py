import numpy as np
import os 

def save_data(filepath, binary, augment): 
	from keras.utils import np_utils, plot_model
	csv_data = np.genfromtxt(filepath, delimiter=",")
	eeg_data = csv_data[1:]

	labels = []
	cleaned_eeg_data = []

	if binary:  
		for i in range(len(eeg_data)):
			#seizure vs non-seizure only
			labels.append(0 if (eeg_data[i][-1] == 1) else 1)
			cleaned_eeg_data.append((eeg_data[i][:-1])[1:])
	else: 
		for i in range(len(eeg_data)):
			labels.append(eeg_data[i][-1]-1)
			cleaned_eeg_data.append((eeg_data[i][:-1])[1:])

	if augment: 
		labels, cleaned_eeg_data = augment_data(labels, cleaned_eeg_data)

	labels = np.array(labels)
	labels = np_utils.to_categorical(labels)
	np.save("dataset/y_test", labels)
	cleaned_eeg_data = np.array(cleaned_eeg_data)
	cleaned_eeg_data = np.reshape(cleaned_eeg_data, (cleaned_eeg_data.shape[0], cleaned_eeg_data.shape[1], 1, 1))
	np.save("dataset/x_test", cleaned_eeg_data)

	#needed for SNNtoolbox
	np.savez_compressed("dataset/y_test.npz", labels)
	np.savez_compressed("dataset/x_test.npz", cleaned_eeg_data)
	np.savez_compressed("dataset/x_norm.npz", cleaned_eeg_data)

def save_data_to_3d(filepath, binary, augment): 
	from keras.utils import np_utils, plot_model
	csv_data = np.genfromtxt(filepath, delimiter=",")
	eeg_data = csv_data[1:]

	labels = []
	cleaned_eeg_data = []

	if binary:  
		for i in range(len(eeg_data)):
			#seizure vs non-seizure only
			labels.append(0 if (eeg_data[i][-1] == 1) else 1)
			cleaned_eeg_data.append((eeg_data[i][:-1])[1:])
	else: 
		for i in range(len(eeg_data)):
			labels.append(eeg_data[i][-1]-1)
			cleaned_eeg_data.append((eeg_data[i][:-1])[1:])

	if augment: 
		labels, cleaned_eeg_data = augment_data(labels, cleaned_eeg_data)

	labels = np.array(labels)
	labels = np_utils.to_categorical(labels)
	np.save("dataset/y_test", labels)
	cleaned_eeg_data = np.array(cleaned_eeg_data)
	cleaned_eeg_data = np.reshape(cleaned_eeg_data, (cleaned_eeg_data.shape[0], cleaned_eeg_data.shape[1], 1))
	np.save("dataset/x_test", cleaned_eeg_data)

	#needed for SNNtoolbox
	np.savez_compressed("dataset/y_test.npz", labels)
	np.savez_compressed("dataset/x_test.npz", cleaned_eeg_data)
	np.savez_compressed("dataset/x_norm.npz", cleaned_eeg_data)


def load_data(): 
	exists = os.path.isfile('./dataset/x_test.npy') and os.path.isfile('./dataset/y_test.npy')
	if not exists: 
		raise Exception("Save the data to .npy first! Call save_data(filepath).")

	eeg_data = np.load('./dataset/x_test.npy')
	labels = np.load('./dataset/y_test.npy')

	return eeg_data, labels


def augment_data(labels, eeg_data): 
	import random
	# data_augmentation using white gaussian noise + shuffling
	for i in range(len(eeg_data)): 
		noise = np.random.normal(0, 0.1, len(eeg_data[0]))
		eeg_data.append([x + y for x, y in zip(eeg_data[i], noise)])
		labels.append(labels[i])

	combined = list(zip(labels, eeg_data))
	random.shuffle(combined)
	labels[:], eeg_data[:] = zip(*combined)

	return labels, eeg_data