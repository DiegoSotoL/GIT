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


from pandas import DataFrame
   
Data = {'Year': [1920,1930,1940,1950,1960,1970,1980,1990,2000,2010],
        'Unemployment_Rate': [9.8,12,8,7.2,6.9,7,6.5,6.2,5.5,6.3]
       }
  
df = DataFrame(Data,columns=['Year','Unemployment_Rate'])
print (df)	

df.plot(x ='Year', y='Unemployment_Rate', kind = 'line')