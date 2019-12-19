import pandas as pd
import matplotlib.pyplot as plt

# df=pd.read_csv('pokemon_data.csv')
# # print(df)
# # print(df.head(5)) #meustar lso primeros elementos del dataframe
# # print(df.tail(5)) #muestar los ultimos elementos del dataframe
# df_txt = pd.read_csv('pokemon_data.txt', delimiter='\t')
# print(df_txt)

##imprime cada columna
# print(df.head(4)[['Name', 'Type 1', 'HP']])

##imprime cada fila 
# print(df.head(4))

#imprime un dato especifico(index=2)
# print(df.iloc[2,1])

#recorre el dataframe
# for index,row in df.iterrows():
#     print(index,row['Name'])

# #imprime los datos de un tipo especifico
# print(df.loc[df['Type 1']  == "Fire"] )