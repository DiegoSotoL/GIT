def normal_rule(x):
  y = 2*x -1
  return y

print(normal_rule(-1))
print(normal_rule(0))  
print(normal_rule(1))  
print(normal_rule(2))

print(normal_rule(10))

import tensorflow as tf
import numpy as np
from tensorflow import keras

input_x = np.array([-1,0,1,2,3,4],dtype=float)
output_y = np.array([-3,-1,1,3,5,7],dtype=float)

for i,c in enumerate(input_x):
  print(c,output_y[i])

model = tf.keras.Sequential(
    [keras.layers.Dense(units=1, input_shape=[1])]
)

"""1. Y = 10X - 10 
*proceso del optimizador, teniendo en cuenta el loss*
Y= 6X - 5,
"""

model.compile(optimizer="sgd",loss="mean_squared_error")

history = model.fit(input_x,output_y,epochs=500)

print(history)

import matplotlib.pyplot as plt

plt.xlabel("Epochs")
plt.ylabel("Loss")
plt.plot(history.history["loss"])
plt.show()

print(model.predict([10.0]))

print(model.get_weights())