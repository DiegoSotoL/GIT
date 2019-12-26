import pandas as pd
import matplotlib.pyplot as plt

df=pd.read_csv('pokemon_data.csv')
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

#ordenamiento 
# print(df.sort_values(['Type 1','HP'] , ascending=True))


# df['Total'] = df['HP']+df['Attack']+df['Defense']
# print(df.head(5))
#EJEMPLO DROP
# df = df.drop(columns='Total')
# print(df.head(5))

# #axis determina hacia que lado se realiza la suma(1-0)
# df['Total']= df.iloc[:, 4:10].sum(axis=1)
# # print(df.head(5))

# #obtiene el nombre de als columnas en una lista
# cols = list(df.columns)
# print(cols)
# #reordena las columnas pára que el total se enccuentre antes de los valores
# df= df[cols[0:4]+[cols[-1]]+cols[4:12]]
# print(df.head(5))

#una vez modificado el df,s e dfesea guardar en un archivo csv
# df.to_csv('pokemon_csv_v2.csv', index =False)
# df.to_excel('pokemon_excel_v2.xlsx', index=False)
# df.to_csv('pokemon_txt_v2.txt', index=False, sep= '\t')


# se realiza un nuevo dataframe con los pokemones que son planta veneno para luego realizar un gracfico de abrra de sus HP
# df2=df.loc[(df['Type 1']=='Grass') & (df['Type 2']=='Poison')]

# Resetea el index despues de que se cambia el df
# df2 = df2.reset_index()

# print(df.loc[(df['Type 1']=='Grass') & (df['Type 2']=='Poison')])
# print(df.loc[(df['Type 1']=='Grass') | (df['Type 2']=='Poison')])
# plot = df2.plot(x ='Name', y='HP', kind = 'bar')
# plt.show()

##REALIZA UN DF DE TODOS LOS POKEMONES MEGA
# dff= df.loc[df['Name'].str.contains('Mega') ]
# dff.sort_values(['#'] , ascending=True)
# print(dff)


##EL POKEMON TIPO FUEGO DE LA TERCERA GENERACION CON LA MEJORHP

###GIT PANDAS BASICS###
# dfff= df.loc[(df['Type 1']=='Fire') | (df['Type 2']=='Fire')]
# # dfff.order
# # print(dfff)

# ndf= dfff.loc[dfff['Generation']==3]

# ndf.sort_values(['HP'] , ascending=True)
# print(ndf.tail(1))

#REGULAR EXPRESION & FLAGS(filtrado de datos)
# import re
# # print(df.loc[df['Type 1'].str.contains('fire|grass', flags =re.I, regex=True)])
# print(df.loc[df['Name'].str.contains('^pi[a-z]*', flags =re.I, regex=True)])

#cambiar todos los tipo fire a fuego
# df.loc[df['Type 1']=='Fire', 'Type 1'] = 'Fuego'
# print(df)