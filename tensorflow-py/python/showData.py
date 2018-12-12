import parser
pcg = parser.PCG("../data/training-f")
pcg.initialize_wav_data()
print(pcg.test.y)
