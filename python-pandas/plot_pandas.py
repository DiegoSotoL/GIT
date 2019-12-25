import pandas as pd
import matplotlib.pyplot as plt

df=pd.read_csv('pokemon_data.csv')



# ##grafico de puntos
# plot = df.plot(x ='Speed', y='HP', kind = 'scatter')

# plt.show()

# ##grafico de lineas
# df.plot(x ='Speed', y='HP', kind = 'line')
# plt.show()

 ##grafico de barras
# plot = df.plot(x ='Speed', y='HP', kind = 'bar')

# plt.show()

# ##grafico de torta
# df.plot.pie(y='Speed',figsize=(5, 5),autopct='%1.1f%%', startangle=90)
# plt.show()