import pandas as pd
import matplotlib.pyplot as plt

df=pd.read_csv('directorio_establecimientos_2019.csv')
df2=df.loc[(df['ENS_01']==110) | (df['ENS_02']==110) | (df['ENS_03']==110)]
print(df2)
df2.to_csv('filtro-region-basica.txt', index=False, sep= '\t')
municipal = df2.loc[df['COD_DEPE2']==1].count()[0]
subencionado = df2.loc[df['COD_DEPE2']==2].count()[0]
particular = df2.loc[df['COD_DEPE2']==3].count()[0]
labels = ['MUNICIPALES', 'PARTICULAR SUBVENCIONADOS', 'PARTICULAR PAGADOS']
plt.pie([municipal,subencionado,particular], labels = labels, autopct='%.2f')
plt.show()
